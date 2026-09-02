class SpeechService {
  constructor() {
    this.synth = window.speechSynthesis;
    this.currentUtterance = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.currentArticleId = null;
    this.callbacks = [];

    // Load available voices
    this.voices = [];
    if (this.synth) {
      this.loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    this.voices = this.synth.getVoices();
  }

  getBestVoice() {
    if (!this.voices.length) this.loadVoices();
    // Prefer natural English voices
    const preferred = this.voices.find(v => 
      v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Premium'))
    );
    return preferred || this.voices.find(v => v.lang.startsWith('en')) || this.voices[0];
  }

  speakArticle(article, onEndCallback) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    // If already playing this article, toggle pause/play
    if (this.isPlaying && this.currentArticleId === article.id) {
      if (this.isPaused) {
        this.resume();
      } else {
        this.pause();
      }
      return;
    }

    // Stop previous utterance
    this.stop();

    const cleanTitle = article.title ? article.title.replace(/<[^>]*>?/gm, '') : '';
    const cleanSnippet = article.snippet ? article.snippet.replace(/<[^>]*>?/gm, '') : '';
    const cleanContent = article.content ? article.content.replace(/<[^>]*>?/gm, '') : '';
    const textToSpeak = `Story from ${article.source}. Headline: ${cleanTitle}. Summary: ${cleanSnippet || cleanContent}`;

    this.currentUtterance = new SpeechSynthesisUtterance(textToSpeak);
    this.currentUtterance.voice = this.getBestVoice();
    this.currentUtterance.rate = 1.0;
    this.currentUtterance.pitch = 1.0;

    this.currentArticleId = article.id;
    this.isPlaying = true;
    this.isPaused = false;

    this.currentUtterance.onstart = () => {
      this.notifyStateChange('playing', article);
    };

    this.currentUtterance.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this.currentArticleId = null;
      this.notifyStateChange('ended', article);
      if (onEndCallback) onEndCallback();
    };

    this.currentUtterance.onerror = (e) => {
      console.warn('Speech synthesis error', e);
      this.isPlaying = false;
      this.isPaused = false;
      this.currentArticleId = null;
      this.notifyStateChange('ended', article);
    };

    this.synth.speak(this.currentUtterance);
  }

  pause() {
    if (this.synth && this.isPlaying && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
      this.notifyStateChange('paused');
    }
  }

  resume() {
    if (this.synth && this.isPlaying && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
      this.notifyStateChange('playing');
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isPlaying = false;
      this.isPaused = false;
      this.currentArticleId = null;
      this.notifyStateChange('stopped');
    }
  }

  subscribe(callback) {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter(cb => cb !== callback);
    };
  }

  notifyStateChange(state, article = null) {
    this.callbacks.forEach(cb => cb({
      state,
      article,
      articleId: this.currentArticleId,
      isPlaying: this.isPlaying,
      isPaused: this.isPaused
    }));
  }
}

export const speechService = new SpeechService();
