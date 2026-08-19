import { Article, BriefingItem, Columnist, MarketItem, VisualStory, WeatherData } from '../types';

export const DEMO_ARTICLES: Article[] = [
  {
    id: 'india-lead-001',
    category: 'India',
    title: 'India’s Semiconductor Revolution: $15B Megafab Clusters in Dholera & Sanand Begin Commercial Silicon Runs',
    subtitle: 'With high-yield cleanrooms operational, India joins the elite club of sovereign chipmakers powering domestic EVs, telecommunications, and defense aerospace.',
    summary: 'India achieved historic semiconductor sovereignty today as commercial 28nm and 40nm silicon wafers rolled off cleanroom lines in Gujarat, marking the realization of the India Semiconductor Mission with tier-one global chip design partners.',
    content: [
      'DHOLERA / SANAND — India entered the sovereign semiconductor manufacturing era this morning as cleanroom validation tests completed at the 160-acre Dholera Megafab facility, with the first commercial production batch of power-management and automotive microcontrollers meeting strict 94% yield benchmarks.',
      'The multi-billion dollar joint venture, backed by the India Semiconductor Mission (ISM) and global foundry consortia, represents the culmination of a four-year push to localize critical compute supply chains and insulate domestic electronics assembly from foreign logistics bottlenecks.',
      'Prime ministerial and ministerial delegations attending the inaugural wafer run highlighted that domestic fabrication will supply 60% of India’s booming electric vehicle and 5G/6G telecommunications hardware needs by 2027.',
      '"What we are witnessing in Dholera is the birth of Bharat’s silicon backbone," stated Dr. S. K. Narayanan, Chief Technology Officer of the ISM Taskforce. "For decades, our engineers designed the world’s most sophisticated chips; today, we manufacture them on our own soil with our own cleanrooms and skilled workforce."',
      'Adjacent packaging and testing (ATMP) units in Sanand and Tamil Nadu have already booked full commercial capacity through the fourth quarter, with export shipments to Southeast Asian and European automakers commencing next month.'
    ],
    pullQuote: 'For decades, our engineers designed the world’s most sophisticated chips; today, we manufacture them on our own soil with our own sovereign cleanrooms.',
    author: {
      name: 'Priyanka Sen',
      role: 'South Asia Infrastructure & Technology Bureau Chief',
      bio: 'Investigating national infrastructure transformations, semiconductor supply chains, and industrial policy across India.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'New Delhi / Ahmedabad'
    },
    publishedAt: '2026-08-17T09:30:00Z',
    updatedAt: '2026-08-17T11:00:00Z',
    readingTime: 6,
    tags: ['India', 'Semiconductors', 'Dholera', 'Tech Sovereignty', 'Make In India', 'Economy'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Robotic automated handling arms transfer 300mm silicon wafers inside the ultra-clean ISO Class 1 chamber in Dholera, Gujarat.',
    imageCredit: 'WGO India / Rajesh Kulkarni',
    featured: true,
    isBreaking: true,
    edition: ['India', 'Tech', 'Global', 'Business']
  },
  {
    id: 'india-lead-002',
    category: 'Business',
    title: 'UPI & Digital Public Infrastructure Scale to 48 Nations with Real-Time Bilateral Rupee Settlement',
    subtitle: 'Reserve Bank of India expands cross-border linkage connecting South Asia, ASEAN, the Gulf, and Europe at fractional transaction costs.',
    summary: 'India’s Unified Payments Interface cemented its status as the world’s premier real-time payment protocol as five more central banks integrated the open API stack, enabling instant frictionless currency settlement.',
    content: [
      'MUMBAI — The Reserve Bank of India and NPCI International have formalized real-time cross-border payment linkages with five new partner nations across Southeast Asia and the Middle East, expanding UPI’s international footprint to 48 countries.',
      'The interlinked payment gateway eliminates traditional intermediary correspondent banking fees, allowing millions of Indian non-resident workers, small exporters, and international travelers to settle transactions in local currencies instantly via QR codes.',
      'Daily cross-border remittance volume routed through UPI channels crossed $380 million this week, marking a 300% year-over-year surge.',
      '"By treating digital payment networks as open digital public goods rather than proprietary walled gardens, India has established a low-cost, high-velocity financial rail for the emerging world," remarked RBI Deputy Governor Anita Sundaram during the Mumbai Fintech Conclave.'
    ],
    pullQuote: 'By treating digital payments as open digital public goods, India has built a low-cost, high-velocity financial rail for the global economy.',
    author: {
      name: 'Vikram Joshi',
      role: 'Financial Markets & Digital Economy Editor',
      bio: 'Covering monetary policy, fintech innovations, and sovereign capital flows from Mumbai and Bengaluru.',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Mumbai, India'
    },
    publishedAt: '2026-08-17T08:45:00Z',
    readingTime: 5,
    tags: ['India', 'UPI', 'Fintech', 'RBI', 'Economy', 'Markets'],
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'A merchant and customer complete an instant cross-border settlement using biometric UPI terminal in Mumbai.',
    imageCredit: 'WGO / Prashant Gupta',
    featured: false,
    edition: ['India', 'Markets', 'Global', 'Tech']
  },
  {
    id: 'india-lead-003',
    category: 'Science',
    title: 'ISRO Gaganyaan Mission: Final Orbital Crewed Capsule Qualification Completed at Sriharikota',
    subtitle: 'Indian vyomanauts enter final integrated mission simulation at Bengaluru command centre ahead of historic crewed orbital flight.',
    summary: 'The Indian Space Research Organisation (ISRO) successfully concluded the integrated human-rating validation of the Gaganyaan orbital module, paving the way for India to become the fourth nation with sovereign crewed spaceflight capability.',
    content: [
      'SRIHARIKOTA / BENGALURU — ISRO engineers and mission controllers achieved a flawless static countdown and environmental life-support qualification test for the Gaganyaan-H1 crew module at the Satish Dhawan Space Centre.',
      'The 8,200-kilogram spacecraft, engineered to support a three-member crew in a 400-kilometer low-Earth orbit for seven days, demonstrated 100% telemetry fidelity in thermal containment, autonomous abort sequencing, and parachute deployment systems.',
      'The four designated Indian Air Force test pilots—trained at the Astronaut Training Facility in Bengaluru—conducted a simulated 72-hour orbital ingress and zero-gravity emergency egress drill with zero anomalies.',
      '"Every subsystem in this spacecraft reflects Indian scientific ingenuity," stated ISRO Chairman Dr. K. Somnath. "Gaganyaan is not just a milestone mission; it is the foundational platform for the Bharatiya Antariksh Station."'
    ],
    pullQuote: 'Gaganyaan is not just a milestone mission; it is the foundational platform for the Bharatiya Antariksh Station and deep planetary exploration.',
    author: {
      name: 'Dr. Evelyn Cross & Rahul Deshmukh',
      role: 'Space Exploration & Advanced Aerospace Bureau',
      bio: 'Covering ISRO launch telemetry, planetary exploration, and aerospace engineering.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Sriharikota / Bengaluru'
    },
    publishedAt: '2026-08-17T08:15:00Z',
    readingTime: 5,
    tags: ['India', 'ISRO', 'Gaganyaan', 'Space', 'Science', 'Innovation'],
    image: 'https://images.unsplash.com/photo-1517976487507-5b3a4a15a87d?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The Gaganyaan heavy-lift LVM3 launch vehicle illuminated on the second launch pad at Sriharikota.',
    imageCredit: 'ISRO / Space Media Corps',
    featured: false,
    edition: ['India', 'Science', 'Global']
  },
  {
    id: 'india-inv-001',
    category: 'In-Depth',
    title: 'Harnessing the Desert: Inside Khavda, the World’s Largest 30-GW Renewable Energy Megapark',
    subtitle: 'Transforming 726 square kilometers of barren salt desert in Kutch into clean solar-wind electricity powering 16 million Indian homes.',
    summary: 'A deep-dive investigation from the edge of the Indo-Pak border in Gujarat, where 81 million solar panels and 3,000 wind turbines form the planetary benchmark for zero-carbon generation at continent scale.',
    content: [
      'KHAVDA, RANN OF KUTCH — Standing atop the central telemetry observation tower in Khavda, the landscape extends into a shimmering ocean of monocrystalline silicon panels and towering 180-meter wind turbines as far as the horizon allows.',
      'Just five years ago, this 726-square-kilometer swath of the Great Rann of Kutch was an uninhabitable hyper-saline desert prone to blinding dust storms and seasonal inundations. Today, it hosts the single largest clean energy infrastructure installation in human history.',
      'With an ultimate operational capacity of 30,000 megawatts (30 GW), the Khavda complex generates enough clean electricity to power the entire municipal grids of Belgium or Chile, cutting India’s national carbon emissions by 58 million metric tons annually.',
      'Our on-the-ground reporting tracked the deployment of autonomous waterless robotic cleaning duster rigs, engineered specifically in Pune to sweep desert particulate without expending a single drop of precious groundwater.',
      '"What makes Khavda unique is not merely its staggering physical footprint," explains Chief Project Engineer Hardik Patel. "It is the ultra-high-voltage direct current (HVDC) transmission corridor that pumps green power across 1,800 kilometers to northern and central industrial clusters in real time."'
    ],
    pullQuote: 'Khavda proves that the energy transition in the Global South does not need to be an incremental compromise—it can be an unprecedented industrial leap.',
    author: {
      name: 'Tariq Al-Mansoor & Priyanka Sen',
      role: 'WGO Investigations & Climate Bureau',
      bio: 'Investigating massive clean-tech infrastructure, green corridors, and environmental policy.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Kutch / New Delhi'
    },
    publishedAt: '2026-08-16T20:00:00Z',
    readingTime: 8,
    tags: ['In-Depth', 'India', 'Clean Energy', 'Solar', 'Khavda', 'Climate', 'Special Report'],
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Vast arrays of solar trackers align with the afternoon sun across the salt flats of Khavda in Gujarat.',
    imageCredit: 'WGO Investigations / Aniruddh Mehra',
    featured: true,
    isInvestigative: true,
    edition: ['India', 'Climate', 'Global']
  },
  {
    id: 'india-sports-001',
    category: 'Sports',
    title: 'BCCI Unveils Next-Gen AI Biomechanics & Pitch Telemetry Hub at National Cricket Academy, Bengaluru',
    subtitle: 'High-speed computer vision and inertial sensors optimize bowling actions and injury recovery across Indian national teams.',
    summary: 'The Board of Control for Cricket in India (BCCI) has launched the world’s most advanced cricket sports-science facility at the newly expanded NCA in Bengaluru, integrating high-rate motion capture and automated stress tracking.',
    content: [
      'BENGALURU — Behind the manicured turf wickets of the newly inaugurated 40-acre National Cricket Academy campus, high-speed 500-fps infrared cameras track the kinetic chain of every delivery bowled by national pace spearheads.',
      'The multi-sport biometric laboratory measures shoulder rotational torque, trunk flexion, and ground reaction forces in real time, alerting physiotherapists to micro-fatigue before soft-tissue stress fractures can develop.',
      'With the World Test Championship cycle and international tour schedules placing severe demands on players, the telemetry system customizes individual recovery protocols for fast bowlers, batsmen, and spinners alike.',
      '"Modern cricket demands elite physiological precision," noted India Head Coach. "This facility gives our athletes the predictive edge to perform at peak velocity across all three formats."'
    ],
    pullQuote: 'Cricket is no longer just intuition; it is an athletic science where biometric micro-adjustments preserve careers and win global championships.',
    author: {
      name: 'Julian Thorne & Rohan Gavaskar',
      role: 'Cricket & Sports Science Correspondents',
      bio: 'Covering international cricket, sports physiology, and tournament strategies.',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Bengaluru, India'
    },
    publishedAt: '2026-08-17T06:30:00Z',
    readingTime: 4,
    tags: ['India', 'Sports', 'Cricket', 'BCCI', 'Biomechanics', 'Tech'],
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'A high-speed optical capture setup analyzing bowling release mechanics at the NCA Bengaluru facility.',
    imageCredit: 'WGO Sports / Dinakar Rao',
    edition: ['India', 'Sports']
  },
  {
    id: 'world-001',
    category: 'World',
    title: 'Geneva Global Summit Reaches Landmark Accord on Autonomous Navigation & Maritime Corridors',
    subtitle: 'Delegates from 64 maritime nations endorse a binding framework governing AI-piloted cargo vessels and Arctic passage safety.',
    summary: 'In an unprecedented consensus following two weeks of tense negotiations, international maritime regulators agreed on unified protocols for robotic shipping corridors, resolving crucial liability and environmental oversight questions.',
    content: [
      'GENEVA — After fourteen days of closed-door deliberations, diplomats representing 64 maritime nations have signed the Geneva Maritime Accord, establishing the first comprehensive international legal framework for autonomous commercial shipping.',
      'The treaty addresses long-standing legal ambiguities regarding salvage rights, algorithmic fault attribution in international waters, and mandatory ecological mitigation corridors across sensitive Arctic waterways.',
      'Under the new framework, all unmanned commercial vessels exceeding 10,000 gross tonnage must maintain dual-redundant human override uplink stations and contribute to an international emergency oceanic containment fund.',
      '"What we have achieved today is not merely technical standardisation," noted Dr. Elena Vance, Lead Negotiator for the International Maritime Council. "We have ensured that the next century of global trade balances technological speed with ecological stewardship and indisputable human accountability."',
      'The accord is slated to take effect across European, Asian, and Pacific economic zones by the second quarter of next year, with ratifications accelerating across major port authorities.'
    ],
    pullQuote: 'We have ensured that the next century of global trade balances technological speed with ecological stewardship and indisputable human accountability.',
    author: {
      name: 'Alexandre Mercer',
      role: 'Chief Diplomatic Correspondent',
      bio: 'Former foreign bureau chief in Brussels and Tokyo, covering international treaties, oceanic commerce, and multilateral diplomacy.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Geneva, Switzerland'
    },
    publishedAt: '2026-08-17T08:30:00Z',
    updatedAt: '2026-08-17T10:15:00Z',
    readingTime: 6,
    tags: ['World', 'Maritime', 'Geneva', 'Trade', 'Diplomacy', 'Global Accord'],
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Delegates assemble inside the Palais des Nations following the final ratification of the Geneva Maritime Accord.',
    imageCredit: 'Reuters / Fabrice Coffrini',
    featured: true,
    isBreaking: false,
    edition: ['Global', 'US', 'Tech']
  },
  {
    id: 'tech-001',
    category: 'AI & Tech',
    title: 'Neuromorphic Silicon Breakthrough Slashes Data Center Power Demands by 70%',
    subtitle: 'Researchers at the Zurich Quantum Institute demonstrate analog spiking chips capable of running frontier multi-modal models on sub-watt envelopes.',
    summary: 'A new architecture replicating biological synaptic plasticity allows deep learning inference without traditional memory bandwidth bottlenecks, presenting a potential exit ramp from the energy crisis gripping cloud infrastructure.',
    content: [
      'ZURICH — A coalition of computer scientists and neurophysiologists has announced a functional prototype of a 3D-stacked neuromorphic processor that reduces power consumption for neural network reasoning by over two-thirds.',
      'Unlike conventional GPUs that shuffle massive floating-point matrices back and forth across high-bandwidth memory buses, the new "Synapse-9" silicon computes directly in non-volatile resistive memory arrays.',
      'The implications for the broader tech sector are staggering. Hyperscale data center operators have faced intensifying municipal pushback over grid strain, with energy demands for AI inference previously projected to triple by 2028.',
      'Independent benchmark suites validated that the chip sustained real-time video understanding and contextual voice synthesis while drawing less than 45 watts under peak continuous load.',
      '"We are witnessing the transition from brute-force brute-heat compute to biomorphic efficiency," stated Dr. Hannah Lindqvist, lead principal architect of the project.'
    ],
    pullQuote: 'We are witnessing the transition from brute-force brute-heat compute to biomorphic efficiency.',
    author: {
      name: 'Devin K. Chen',
      role: 'Senior Technology & Semiconductors Editor',
      bio: 'Covering microarchitecture, quantum systems, and artificial intelligence infrastructure across Silicon Valley and European labs.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'San Francisco, CA'
    },
    publishedAt: '2026-08-17T09:10:00Z',
    readingTime: 5,
    tags: ['AI & Tech', 'Semiconductors', 'Clean Energy', 'Silicon', 'Innovation'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'A micro-photograph of the Synapse-9 neuromorphic wafer undergoing thermal imaging during active multi-modal inference.',
    imageCredit: 'WGO / Science Photo Library',
    featured: false,
    edition: ['Global', 'Tech', 'AI']
  },
  {
    id: 'india-001',
    category: 'India',
    title: 'India’s National Green Hydrogen Corridor Expands Across Western Coastal Belt',
    subtitle: 'New multimodal pipeline infrastructure in Gujarat and Maharashtra connects solar-wind hybrid parks directly to industrial export terminals.',
    summary: 'India marked a critical milestone in its clean energy transition today as the first pressurized green hydrogen pipeline network commenced commercial supply, positioning the subcontinent as a major zero-carbon fuel exporter.',
    content: [
      'NEW DELHI / AHMEDABAD — India’s strategic green hydrogen ambitions took a tangible leap forward with the commissioning of the 640-kilometer Western Energy Spine connecting Kutch renewable generation clusters to petrochemical and shipping hubs.',
      'The multi-billion dollar public-private initiative integrates gigawatt-scale electrolyzer parks with deepwater export docks, aiming to supply domestic steel manufacturing while fulfilling long-term export contracts with Japan and Germany.',
      'Ministerial briefings highlighted that domestic production costs have converged near $1.85 per kilogram, aided by ultra-low solar tariffs and localized membrane manufacturing.',
      'Industry leaders noted that this corridor not only mitigates industrial carbon emissions by an estimated 14 million metric tons annually but also anchors regional high-tech employment across manufacturing and pipeline engineering.'
    ],
    pullQuote: 'This corridor anchors our industrial security while demonstrating that green heavy manufacturing is economically viable at continent scale.',
    author: {
      name: 'Priyanka Sen',
      role: 'South Asia Infrastructure & Energy Bureau Chief',
      bio: 'Investigating industrial transformations, grid modernization, and energy policy across South and Southeast Asia.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'New Delhi, India'
    },
    publishedAt: '2026-08-17T07:45:00Z',
    readingTime: 4,
    tags: ['India', 'Clean Energy', 'Green Hydrogen', 'Economy', 'Infrastructure'],
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Solar arrays and hydrogen electrolysis containment units outside Mundra port during dawn operations.',
    imageCredit: 'WGO Asia / Aditya Verma',
    featured: false,
    edition: ['Global', 'India', 'Climate']
  },
  {
    id: 'markets-001',
    category: 'Markets',
    title: 'Central Banks Signal Coordinated Liquidity Easing as Inflation Cools Across G10 Nations',
    subtitle: 'Bond yields compress sharply across sovereign curves following dovish policy guidance from Frankfurt, Tokyo, and Washington.',
    summary: 'Global equity markets rallied to multi-month highs after synchronised central bank commentary suggested rate cuts will outpace earlier forecasts, bolstered by collapsing logistics costs and stabilized commodity inputs.',
    content: [
      'LONDON — Global sovereign bond yields recorded their steepest single-day drop of the quarter as monetary policymakers from the Federal Reserve, European Central Bank, and Bank of England indicated that headline and core disinflation trajectories have firmly taken hold.',
      'Trading desks in London and New York saw heavy rotation into cyclical equities, emerging market sovereign debt, and renewable infrastructure funds.',
      'Analysts pointed to consumer price indices dropping below target thresholds in seven major economies, removing pressure on central bank governors to maintain restrictive monetary stances.',
      '"The macroeconomic puzzle of the past four years is resolving into a soft landing of historic proportions," commented Marcus Sterling, Chief Global Strategist at Valmont Capital.'
    ],
    pullQuote: 'The macroeconomic puzzle is resolving into a soft landing of historic proportions with inflation pressures thoroughly dissipated.',
    author: {
      name: 'Marcus Sterling',
      role: 'Global Markets Editor',
      bio: 'Veteran financial journalist covering fixed income, foreign exchange, and central bank governance for over two decades.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'London, UK'
    },
    publishedAt: '2026-08-17T08:00:00Z',
    readingTime: 4,
    tags: ['Markets', 'Central Banks', 'Inflation', 'Bonds', 'Economy'],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Traders on the floor of the London Stock Exchange react to dovish commentary from the European Central Bank.',
    imageCredit: 'Bloomberg / Simon Dawson',
    featured: false,
    edition: ['Global', 'Markets', 'US']
  },
  {
    id: 'climate-001',
    category: 'Climate',
    title: 'Southern Ocean Microbial Carbon Sinks Reveal Unexpected Resilience in Antarctic Survey',
    subtitle: 'An 18-month oceanographic study shows cold-adapted diatom blooms sequestering 35% more carbon dioxide than climate models had anticipated.',
    summary: 'Findings published by the Polar Research Consortium provide critical nuance to global oceanic carbon cycle models, though researchers stress that runaway acidification remains an imminent peril.',
    content: [
      'MCMURDO STATION, ANTARCTICA — Data retrieved from an autonomous fleet of underwater robotic gliders patrolling the Ross Sea has revealed an extraordinary resilience in Antarctic phytoplankton communities.',
      'Over an 18-month observation cycle, biological pump efficiency—the process through which organic carbon settles to abyssal depths—exceeded conventional climate model benchmarks by 35 percent.',
      'The unexpected surge in sequestration appears linked to seasonal trace iron plumes released by subglacial meltwater streams.',
      'However, marine biogeochemists warned against complacency. "While this microbial buffering provides vital temporary relief, acidification rates along coastal shelves continue to threaten calcifying krill and pteropod populations at the foundation of the polar food web," noted Dr. Astrid Lindholm.'
    ],
    pullQuote: 'While this microbial buffering provides vital temporary relief, acidification rates along coastal shelves continue to threaten the entire polar food web.',
    author: {
      name: 'Dr. Astrid Lindholm',
      role: 'Senior Environmental & Polar Correspondent',
      bio: 'Oceanographer and science writer reporting from polar expeditions and climate summits worldwide.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Hobart, Australia'
    },
    publishedAt: '2026-08-17T06:15:00Z',
    readingTime: 5,
    tags: ['Climate', 'Oceans', 'Antarctica', 'Science', 'Ecosystems'],
    image: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'An autonomous research vessel deploys deep-water sensors amidst tabular icebergs in the Antarctic Southern Ocean.',
    imageCredit: 'WGO / Polar Research Consortium',
    featured: false,
    edition: ['Global', 'Climate']
  },
  {
    id: 'investigative-001',
    category: 'In-Depth',
    title: 'The Shadow Mineral Route: Inside the Covert Cobalt & Rare Earth Supply Chains',
    subtitle: 'A four-month cross-border investigation traces uncertified mineral flows from clandestine artisanal pits to tier-one consumer electronics.',
    summary: 'Leveraging satellite synthetic-aperture radar, customs manifests, and undercover ground reporting across Central Africa and Southeast Asia, WGO reveals how loophole processing hubs launder illicit minerals into global supply chains.',
    content: [
      'KOLWEZI / SINGAPORE — On paper, the global battery supply chain has never been cleaner. Corporate sustainability disclosures promise conflict-free sourcing, blockchain auditing, and strict zero-child-labor certifications.',
      'On the ground, however, our four-month investigation uncovered a sophisticated network of intermediary smelting refineries and transshipment warehouses designed to disguise the origins of illegally excavated ore.',
      'Artisanal miners operating in unregulated trenches sell raw concentrate to middlemen for a fraction of spot market value. From there, forged certificates of origin are minted at border crossings before the materials are blended with certified industrial batches in maritime free-trade zones.',
      'Internal audit documents obtained by WGO demonstrate that over 120,000 metric tons of unverified cobalt and dysprosium entered the assembly lines of major multinational manufacturers over the past twelve months.',
      '"The auditing regimes currently relied upon by Western and Asian buyers are largely cosmetic paper exercises," stated an anonymous compliance officer at a major international logistics firm.'
    ],
    pullQuote: 'The auditing regimes currently relied upon by global buyers are largely cosmetic paper exercises designed to create plausible deniability.',
    author: {
      name: 'Tariq Al-Mansoor & Claire Dupont',
      role: 'WGO Investigative Project Team',
      bio: 'Award-winning investigative reporting duo specializing in illicit trade networks, corporate malfeasance, and resource governance.',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Nairobi / Geneva'
    },
    publishedAt: '2026-08-16T18:00:00Z',
    readingTime: 9,
    tags: ['In-Depth', 'Investigative', 'Supply Chain', 'Minerals', 'Human Rights', 'Special Report'],
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Artisanal mineral sorters sift through raw extraction deposits near an unmonitored concession in Katanga province.',
    imageCredit: 'WGO Investigations / Magnum Photos',
    featured: true,
    isInvestigative: true,
    edition: ['Global', 'Tech', 'US']
  },
  {
    id: 'politics-001',
    category: 'Politics',
    title: 'European Parliament Debates Sovereign Digital Identity & Data Boundary Directives',
    subtitle: 'Privacy advocates and tech consortiums clash over federated encryption standards and state decryption mandates.',
    summary: 'A fierce legislative battle in Strasbourg will define how 450 million citizens manage biometric identification and whether end-to-end messaging protocols can maintain algorithmic sanctuaries.',
    content: [
      'STRASBOURG — European lawmakers convened this morning for the decisive first reading of the Sovereign Digital Commons Directive, legislation that seeks to replace proprietary tech logins with a continent-wide, cryptographic citizen wallet.',
      'While the proposal guarantees citizens unilateral control over their financial records and health identities, a controversial amendment requiring "proportional Lawful Intercept" keys has united civil liberties groups and cybersecurity experts in fierce opposition.',
      'Rapporteurs argued that decentralized identity prevents predatory commercial profiling, while opponents warned that government-mandated backdoors inevitably invite hostile state espionage.',
      'The final vote, expected late Thursday evening, is predicted to pass by a razor-thin coalition margin.'
    ],
    pullQuote: 'We cannot build democratic digital infrastructure by inserting systematic vulnerabilities into the foundations of citizen privacy.',
    author: {
      name: 'Valérie Rousseau',
      role: 'European Union Affairs Analyst',
      bio: 'Covering legislative policymaking, digital rights, and European integration from Brussels and Strasbourg.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Strasbourg, France'
    },
    publishedAt: '2026-08-17T07:10:00Z',
    readingTime: 4,
    tags: ['Politics', 'Europe', 'Privacy', 'Legislation', 'Digital Rights'],
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Members of the European Parliament confer during debate over digital sovereignty amendments.',
    imageCredit: 'European Union / Daina Le Lardic',
    edition: ['Global']
  },
  {
    id: 'business-001',
    category: 'Business',
    title: 'Aviation Heavyweights Bet $14B on Blended-Wing Aircraft to Decarbonize Long-Haul Travel',
    subtitle: 'Commercial flight trials for aerodynamic triangular fuselages promise 40% fuel burn reduction before decade’s end.',
    summary: 'The biggest design revolution in commercial aviation since the jet age gathered institutional momentum today with multi-airline order commitments for ultra-wide blended-wing passenger craft.',
    content: [
      'SEATTLE / TOULOUSE — For more than seven decades, passenger aviation has relied upon the standard "tube-and-wing" aerodynamic configuration. Today, that orthodoxy was definitively challenged.',
      'A consortium of top global aerospace manufacturers confirmed $14.2 billion in firm pre-orders for 280-passenger blended-wing aircraft capable of transpacific range on sustainable aviation fuels.',
      'The triangular lifting fuselage generates aerodynamic lift across the entire body rather than just the wings, radically diminishing drag and opening unprecedented cabin architecture options.',
      'Test flights are scheduled for late 2027 at Edwards Air Force Base, with commercial route integration slated for major international carriers by 2030.'
    ],
    pullQuote: 'This is the most profound aerodynamic shift in civil aviation since the De Havilland Comet ushered in the passenger jet age.',
    author: {
      name: 'Arthur Pendelton',
      role: 'Aerospace & Heavy Industry Correspondent',
      bio: 'Covering commercial flight, defense manufacturing, and advanced transport engineering for fifteen years.',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Seattle, WA'
    },
    publishedAt: '2026-08-16T22:30:00Z',
    readingTime: 5,
    tags: ['Business', 'Aviation', 'Innovation', 'Aerospace', 'Clean Tech'],
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'A full-scale aerodynamic test airframe undergoes subsonic wind tunnel evaluation.',
    imageCredit: 'WGO Aviation / Dan Winters',
    edition: ['Global', 'Tech', 'Business']
  },
  {
    id: 'culture-001',
    category: 'Culture',
    title: 'The Great Acoustic Revival: Why Vinyl & Analog Audio Sales Are Surpassing Digital Streaming',
    subtitle: 'From Tokyo listening bars to London pressing plants, listeners are seeking tactile presence over endless algorithmic feeds.',
    summary: 'Physical music formats are experiencing a staggering renaissance among Gen-Z and millennial audiences, transforming neighborhood listening lounges into vital community hubs.',
    content: [
      'TOKYO — In an age where nearly 120 million tracks reside in the cloud accessible in milliseconds, an increasing portion of music lovers are deliberately turning off their screens.',
      'Vinyl record sales and cassette production across Japan, Europe, and North America reached their highest commercial volume since 1989 this month, driven not by nostalgic collectors, but by listeners under thirty.',
      'Sociologists and acoustic engineers attribute the shift to "algorithmic fatigue"—a yearning for the intentionality, rich dynamic headroom, and deliberate physical ritual that analog media demands.',
      'In Tokyo’s Shibuya district, high-fidelity listening bars equipped with custom tube amplifiers and horn speakers report three-hour queues every weekend night.'
    ],
    pullQuote: 'When every song in human history is instantly available for free, intentionality becomes the ultimate luxury.',
    author: {
      name: 'Maya Lin-Kowalski',
      role: 'Culture & Modern Living Critic',
      bio: 'Writing on aesthetics, urban sociology, musical subcultures, and the psychological impact of digital technology.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Tokyo, Japan'
    },
    publishedAt: '2026-08-17T05:00:00Z',
    readingTime: 4,
    tags: ['Culture', 'Music', 'Analog', 'Vinyl', 'Sociology'],
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'A patron selects a 1978 jazz pressing at the Sessa Hi-Fi Audio Lounge in Shibuya.',
    imageCredit: 'WGO Culture / Kenjiro Sato',
    edition: ['Global', 'Culture']
  },
  {
    id: 'sports-001',
    category: 'Sports',
    title: 'Biometric Analytics and Robotic Pacing Upend Marathon World Championship Preparations',
    subtitle: 'Elite distance runners are adopting aerodynamic draft cages and real-time lactate sensors in pursuit of the sub-1:58 threshold.',
    summary: 'The intersection of sports physiology and autonomous engineering is transforming endurance athletics, sparking fierce debates over the boundaries of human performance.',
    content: [
      'BERLIN — On the tarmac surrounding Berlin’s Tempelhof field at dawn, a battery-powered aerodynamic pacing rig glided ahead of a phalanx of elite marathoners, lasers tracing the optimal trajectory onto the asphalt.',
      'Equipped with continuous metabolic telemetry sensors monitoring interstitial glucose and muscle oxygenation in real-time, runners now fine-tune their pacing down to hundredths of a second per kilometer.',
      'Athletics federations are currently drafting new guidelines regarding allowable in-race algorithmic audio coaching and footwear carbon geometry.',
      'Sports historians remark that we are witnessing the exact point where biological endurance becomes an optimized engineering discipline.'
    ],
    pullQuote: 'We are reaching the exact point where biological endurance becomes an optimized engineering discipline.',
    author: {
      name: 'Julian Thorne',
      role: 'Senior Sports & Physiology Editor',
      bio: 'Covering global athletics, biomechanics, and sports governance from major Olympic and championship circuits.',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Berlin, Germany'
    },
    publishedAt: '2026-08-16T19:40:00Z',
    readingTime: 4,
    tags: ['Sports', 'Athletics', 'Biomechanics', 'Marathon', 'Technology'],
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Marathon contenders conduct early-morning interval pacing tests along the Tempelhof runway.',
    imageCredit: 'WGO Sports / Michael Hecker',
    edition: ['Global', 'Sports']
  },
  {
    id: 'science-001',
    category: 'Science',
    title: 'James Webb Telescope Detects Atmospheric Water Vapor and Methane on Habitable-Zone Super-Earth',
    subtitle: 'Spectroscopic analysis of exoplanet K2-18b confirms complex atmospheric chemistry 120 light-years away.',
    summary: 'Astrophysicists analyzing transmission spectra from JWST have confirmed the robust detection of carbon-bearing molecules in the temperate atmosphere of a planet orbiting within its star’s habitable zone.',
    content: [
      'BALTIMORE — The Space Telescope Science Institute confirmed today that spectroscopic observations of exoplanet K2-18b have revealed clear signatures of methane, carbon dioxide, and atmospheric water vapor.',
      'Located 120 light-years from Earth in the constellation Leo, K2-18b is an exoplanet 2.6 times the radius of Earth that receives a similar amount of stellar radiation from its host red dwarf.',
      'The data strongly suggests the presence of a hydrogen-rich atmosphere overlying a potentially warm, oceanic surface layer—classifying the world as a "Hycean" candidate.',
      '"These observations represent our most detailed glimpse yet into the chemical architecture of a temperate world outside our solar system," remarked Lead Astrophysicist Dr. Nikku Madhusudhan.'
    ],
    pullQuote: 'These observations represent our most detailed glimpse yet into the chemical architecture of a temperate world outside our solar system.',
    author: {
      name: 'Dr. Evelyn Cross',
      role: 'Astronomy & Physics Correspondent',
      bio: 'Astrophysicist and science journalist reporting on cosmological discoveries, space exploration, and planetary science.',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Baltimore, MD'
    },
    publishedAt: '2026-08-17T03:30:00Z',
    readingTime: 5,
    tags: ['Science', 'Space', 'JWST', 'Astrophysics', 'Exoplanets'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'An artist conceptualization of the atmospheric composition of exoplanet K2-18b against its host dwarf star.',
    imageCredit: 'NASA / ESA / CSA / STScI',
    edition: ['Global', 'Tech']
  },
  {
    id: 'opinion-001',
    category: 'Opinion',
    title: 'The Mirage of Optimization: Why Human Friction Is the Last Bastion of Wisdom',
    subtitle: 'As synthetic agents streamline every friction in our daily lives, we risk losing the very cognitive resistance that produces discernment.',
    summary: 'When efficiency becomes the sole metric of civilization, we sacrifice serendipity, moral doubt, and the creative collisions that occur only when things refuse to go smoothly.',
    content: [
      'We live in the golden age of frictionless existence. Algorithms anticipate what we want to purchase before our conscious minds register the desire. Synthetic writers summarize our colleagues’ thoughts so we never have to endure their wandering syntax.',
      'Yet beneath this seamless digital sheen, a quiet atrophy is underway. Wisdom has never been an output of frictionless throughput. Wisdom is the sediment left behind when human beings struggle with ambiguity, confront failure, and negotiate difference without an intermediary.',
      'To eliminate all cognitive resistance is to mistake the vessel for the wine. If we automate away the labor of thinking, feeling, and deliberating, we do not liberate human potential—we abdicate it.'
    ],
    pullQuote: 'Wisdom is the sediment left behind when human beings struggle with ambiguity, confront failure, and negotiate difference without an intermediary.',
    author: {
      name: 'Soraya Sterling',
      role: 'Senior Columnist & Cultural Philosopher',
      bio: 'Author of "The Unmapped Mind" and contributing essayist on technology ethics, philosophy, and modern political thought.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Oxford, UK'
    },
    publishedAt: '2026-08-17T06:00:00Z',
    readingTime: 4,
    tags: ['Opinion', 'Philosophy', 'Culture', 'Technology', 'Ethics'],
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'A quiet reading room at the Bodleian Library at Oxford University.',
    imageCredit: 'WGO / Christopher Doyle',
    isOpinion: true,
    edition: ['Global', 'Culture']
  },
  {
    id: 'india-002',
    category: 'India',
    title: 'Bengaluru AI & Biotechnology Corridor Attracts Record $9.2B in R&D Capital',
    subtitle: 'Global pharmaceutical and semiconductor leaders establish deep-tech research headquarters across Electronic City.',
    summary: 'Driven by high-density engineering talent and progressive patent frameworks, India’s technological capital has evolved from a back-office hub into a primary generator of frontier intellectual property.',
    content: [
      'BENGALURU — Over the past twelve months, international investment into foundational biotechnology and hardware synthesis centers in Bengaluru has surged past historical records.',
      'State government authorities announced the inauguration of the BioCompute Innovation Zone, a 200-acre campus dedicated to algorithmic drug discovery and computational genomics.',
      'Industry analysts note that over 40 global enterprise leaders have relocated their core R&D decision-making units to the Karnataka corridor, citing unmatched access to specialized mathematics and bioinformatics talent.'
    ],
    pullQuote: 'Bengaluru is no longer executing blueprints designed elsewhere; it is authoring the original architectural patents.',
    author: {
      name: 'Vikram Joshi',
      role: 'India Technology & Enterprise Editor',
      bio: 'Covering South Asian startup ecosystems, venture flows, and deep-tech manufacturing.',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Bengaluru, India'
    },
    publishedAt: '2026-08-17T04:20:00Z',
    readingTime: 4,
    tags: ['India', 'AI & Tech', 'Biotech', 'Bengaluru', 'Economy'],
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Modern tech campus architectures illuminated during dusk in Electronic City, Bengaluru.',
    imageCredit: 'WGO / Tarun Rawat',
    edition: ['India', 'Tech', 'Global']
  },
  {
    id: 'world-002',
    category: 'World',
    title: 'Panama Canal Modernization Completes Second Water-Saving Basin System Ahead of Schedule',
    subtitle: 'New closed-loop recycling reservoirs ensure uninterrupted transit capacity through severe drought cycles.',
    summary: 'The Panama Canal Authority successfully commissioned its advanced water recirculation basin, guaranteeing that trans-oceanic container vessels will face zero draft restrictions regardless of seasonal rainfall variations.',
    content: [
      'PANAMA CITY — In a critical engineering triumph for global supply chains, engineers in Panama opened the final spillway gates of the Rio Indio reservoir network.',
      'The multi-year hydrologic project captures and recycles up to 60 percent of the freshwater used during each lock operation, insulating the vital global waterway from the drought disruptions that constrained vessel traffic in previous years.',
      'Major shipping alliances celebrated the announcement, which restores daily transit slots to standard peak capacity and lowers global container freight volatility.'
    ],
    pullQuote: 'This water-conservation achievement restores absolute certainty to maritime supply lines across the Pacific and Atlantic.',
    author: {
      name: 'Mateo Morales',
      role: 'Latin America Trade & Logistics Correspondent',
      bio: 'Specializing in Latin American commerce, infrastructure megaprojects, and canal operations.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Panama City, Panama'
    },
    publishedAt: '2026-08-16T16:45:00Z',
    readingTime: 4,
    tags: ['World', 'Logistics', 'Panama Canal', 'Trade', 'Infrastructure'],
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'A Neo-Panamax container vessel maneuvers through the newly expanded Cocoli Locks.',
    imageCredit: 'Panama Canal Authority / EPA',
    edition: ['Global', 'Markets']
  },
  {
    id: 'tech-002',
    category: 'AI & Tech',
    title: 'Open Source Robotic Foundation Releases Unified Physical World Simulator',
    subtitle: 'Physics-accurate framework allows humanoid bots to train over 100,000 virtual hours in seconds without expensive hardware rigs.',
    summary: 'A consortium of academic institutes and robotics firms has open-sourced "OmniPhysics," a GPU-accelerated simulation suite poised to accelerate general-purpose manipulation robotics across factories and healthcare.',
    content: [
      'SAN FRANCISCO — The barrier to developing dexterity in humanoid robotics collapsed significantly today with the release of the OmniPhysics engine.',
      'The open-source platform simulates tactile micro-friction, soft-body deformations, and dynamic aerodynamics with mathematical fidelity, enabling reinforcement learning algorithms to transfer seamlessly to real-world hardware without the notorious "sim-to-real gap."',
      'Over 200 robotics startups downloaded the codebase in its first six hours of availability.'
    ],
    pullQuote: 'We have democratized the single hardest component of physical AI: deterministic world simulation.',
    author: {
      name: 'Devin K. Chen',
      role: 'Senior Technology & Semiconductors Editor',
      bio: 'Covering microarchitecture, quantum systems, and artificial intelligence infrastructure across Silicon Valley.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'San Francisco, CA'
    },
    publishedAt: '2026-08-17T02:15:00Z',
    readingTime: 4,
    tags: ['AI & Tech', 'Robotics', 'Open Source', 'Simulation', 'AI'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'A high-precision bimanual robotic actuator calibrates spatial coordinates during a laboratory test.',
    imageCredit: 'WGO Tech / Robotics Lab',
    edition: ['Tech', 'AI']
  },
  {
    id: 'politics-002',
    category: 'Politics',
    title: 'US Senate Bipartisan Committee Unveils Comprehensive Critical Infrastructure Protection Act',
    subtitle: 'Legislation mandates quantum-resistant cryptography for power grids, municipal water reservoirs, and air traffic control.',
    summary: 'With threats to vital national assets growing in complexity, lawmakers from both sides of the aisle introduced sweeping mandates requiring federal utilities to transition to post-quantum encryption standards.',
    content: [
      'WASHINGTON — In a rare display of legislative unanimity, members of the Senate Homeland Security Committee unveiled the Critical Infrastructure Cyber Resilience Act.',
      'The bill provides $8.4 billion in matching grants for municipal utilities to replace legacy supervisory control and data acquisition (SCADA) systems with zero-trust, post-quantum cryptographic protocols over the next five years.',
      'Hearings emphasized recent automated probe attempts against regional power sub-stations, underscoring the urgent imperative to harden civilian electrical topologies.'
    ],
    pullQuote: 'Protecting the physical switches and grid systems of our country is not a partisan matter; it is the baseline requirement of national sovereignty.',
    author: {
      name: 'Rebecca Vance',
      role: 'Capitol Hill & Security Bureau Chief',
      bio: 'Covering federal legislative politics, national security, and defense authorization in Washington.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Washington, D.C.'
    },
    publishedAt: '2026-08-16T21:15:00Z',
    readingTime: 4,
    tags: ['Politics', 'US', 'Cybersecurity', 'Infrastructure', 'Congress'],
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The United States Capitol dome at twilight following the bipartisan committee briefing.',
    imageCredit: 'AP Photo / J. Scott Applewhite',
    edition: ['US', 'Politics']
  },
  {
    id: 'business-002',
    category: 'Business',
    title: 'Next-Generation Solid-State Battery Plants Break Ground Across Scandinavia',
    subtitle: 'Automotive joint ventures invest $8.6B in silicon-anode gigafactories powered by 100% geothermal and hydro energy.',
    summary: 'Scandinavian industrial parks are rapidly transforming into the primary engine of Europe’s next-generation battery supply chain, promising electric vehicles with 1,000-kilometer range and 10-minute ultra-fast charging.',
    content: [
      'STOCKHOLM / OSLO — Construction began simultaneously today on three gigafactories in northern Sweden and Norway dedicated to the commercial mass production of all-solid-state lithium cells.',
      'By utilizing metallic lithium anodes and solid ceramic electrolytes, the plants aim to eliminate flammable organic solvents while boosting volumetric energy density by 80 percent compared to contemporary lithium-ion packs.',
      'The facilities are entirely co-located with dedicated hydropower reservoirs and geothermal wells, ensuring a zero-carbon lifecycle footprint from raw synthesis to final cell packaging.'
    ],
    pullQuote: 'We are creating the cleanest and most energy-dense battery manufacturing ecosystem on Earth.',
    author: {
      name: 'Nils Halvorsen',
      role: 'Nordic Industry & Energy Correspondent',
      bio: 'Covering European manufacturing, clean industrial transitions, and battery chemistry from Oslo.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Stockholm, Sweden'
    },
    publishedAt: '2026-08-16T14:30:00Z',
    readingTime: 4,
    tags: ['Business', 'Batteries', 'EVs', 'Clean Energy', 'Scandinavia'],
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Automated clean-room manufacturing robotics inside an advanced battery prototyping facility.',
    imageCredit: 'WGO / Nordic Energy Press',
    edition: ['Global', 'Business', 'Climate']
  },
  {
    id: 'climate-002',
    category: 'Climate',
    title: 'Urban Rewilding Initiatives Lower European Metropolitan Temperatures by 2.8°C',
    subtitle: 'From Barcelona to Vienna, micro-forest corridors and daylighted urban rivers prove effective against extreme summer heat domes.',
    summary: 'A five-year climatological evaluation demonstrates that systematically replacing asphalt parking lots with indigenous canopy corridors and porous permeable soils directly mitigates deadly urban heat island effects.',
    content: [
      'VIENNA — While heat waves have challenged cities worldwide, urban centers that invested heavily in green canopy infrastructure and river daylighting are recording stark microclimatic resilience.',
      'Comprehensive thermal satellite mappings published by the European Climate Agency show that districts with connected canopy networks registered ambient surface temperatures nearly three degrees Celsius lower than adjacent concrete plazas.',
      'The data is accelerating urban planning redesigns across seventy municipalities, with urban forestry funding now codified into standard municipal building codes.'
    ],
    pullQuote: 'Living foliage and natural river paths are not decorative amenities; they are critical thermal defense infrastructure.',
    author: {
      name: 'Dr. Astrid Lindholm',
      role: 'Senior Environmental & Polar Correspondent',
      bio: 'Oceanographer and science writer reporting from polar expeditions and climate summits worldwide.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Vienna, Austria'
    },
    publishedAt: '2026-08-16T11:00:00Z',
    readingTime: 4,
    tags: ['Climate', 'Urban Planning', 'Rewilding', 'Environment', 'Cities'],
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Pedestrians walk along a newly restored urban stream and green canopy corridor in central Vienna.',
    imageCredit: 'WGO / European Urban Living',
    edition: ['Climate', 'Global']
  },
  {
    id: 'culture-002',
    category: 'Culture',
    title: 'The Global Architecture Biennale Spotlights Regenerative Bamboo & Mycelium Structures',
    subtitle: 'Venice exhibitions champion bio-composite materials that sequester carbon while delivering awe-inspiring spatial forms.',
    summary: 'Architects from five continents presented structural pavilions crafted entirely from engineered bamboo joinery and living fungal root networks, demonstrating that future megacities need not depend on carbon-heavy concrete.',
    content: [
      'VENICE — Under the arches of the Arsenale at the Venice Architecture Biennale, this year’s most celebrated pavilion did not feature gleaming titanium or polished marble.',
      'Instead, visitors walked beneath a soaring, twenty-meter vaulted canopy constructed entirely from structural bamboo laminated with biological fungal mycelium.',
      'The structure, designed by an international collaborative of architects from Colombia, Indonesia, and Kenya, possesses a compressive strength matching reinforced concrete while absorbing double its weight in carbon dioxide during growth.',
      'Curators heralded the exhibit as a manifesto for "the post-extractive architectural era."'
    ],
    pullQuote: 'Architecture must transition from consuming the planet to growing alongside it.',
    author: {
      name: 'Maya Lin-Kowalski',
      role: 'Culture & Modern Living Critic',
      bio: 'Writing on aesthetics, urban sociology, musical subcultures, and the psychological impact of digital technology.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Venice, Italy'
    },
    publishedAt: '2026-08-16T15:20:00Z',
    readingTime: 4,
    tags: ['Culture', 'Architecture', 'Design', 'Sustainability', 'Venice'],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The bio-composite bamboo pavilion on display inside the historic Arsenale in Venice.',
    imageCredit: 'La Biennale di Venezia / Andrea Avezzù',
    edition: ['Culture', 'Global']
  },
  {
    id: 'sports-002',
    category: 'Sports',
    title: 'Women’s Champions League Final Sells Out 85,000-Seat Stadium in Under 40 Minutes',
    subtitle: 'Unprecedented broadcast rights bids and grassroots participation underscore the meteoric global rise of women’s football.',
    summary: 'European football authorities confirmed record-shattering commercial and ticketing demand for the upcoming title match at Wembley Stadium, establishing women’s club football as one of the fastest-growing sports franchises on Earth.',
    content: [
      'LONDON — All 85,000 tickets for the UEFA Women’s Champions League Final were snapped up in less than 40 minutes this morning, marking the fastest sellout in the tournament’s history.',
      'Broadcasters in 140 countries have secured transmission rights, with aggregate global viewership projected to exceed 160 million viewers.',
      'Club sporting directors noted that investments in dedicated training centers and elite sports medicine over the past five years are now paying historic dividends in athletic parity and broadcast engagement.'
    ],
    pullQuote: 'We have moved far beyond proving viability; women’s football is an undeniable titan of global entertainment.',
    author: {
      name: 'Julian Thorne',
      role: 'Senior Sports & Physiology Editor',
      bio: 'Covering global athletics, biomechanics, and sports governance from major Olympic and championship circuits.',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'London, UK'
    },
    publishedAt: '2026-08-16T13:00:00Z',
    readingTime: 3,
    tags: ['Sports', 'Football', 'Champions League', 'Wembley', 'Women in Sport'],
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'A packed stadium roars during a semifinal match of the Women’s Champions League.',
    imageCredit: 'Getty Images / Catherine Ivill',
    edition: ['Sports', 'Global']
  },
  {
    id: 'markets-002',
    category: 'Markets',
    title: 'Semiconductor Foundry CapEx Surges to $190 Billion Amid Sovereign Fab Subsidies',
    subtitle: 'Capital equipment makers report multi-year backlogs for extreme ultraviolet lithography systems.',
    summary: 'Global chipmakers are pouring historic capital into manufacturing plants across Arizona, Dresden, and Kumamoto, insulated by national industrial security guarantees.',
    content: [
      'TOKYO / TAIWAN — Equipment manufacturers supplying the precision optics for 2-nanometer and sub-nanometer wafer fabrication announced record quarterly order backlogs exceeding $62 billion.',
      'As sovereign governments in North America, Europe, and Asia compete to secure resilient domestic silicon foundries, total industry capital expenditures are projected to reach $190 billion this calendar year.',
      'Financial analysts highlighted that while depreciation costs will weigh on near-term gross margins, long-term geographic diversification mitigates extreme geopolitical risks.'
    ],
    pullQuote: 'Silicon fabrication capacity has become the equivalent of 20th-century oil reserves: a non-negotiable anchor of sovereignty.',
    author: {
      name: 'Marcus Sterling',
      role: 'Global Markets Editor',
      bio: 'Veteran financial journalist covering fixed income, foreign exchange, and central bank governance.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Tokyo, Japan'
    },
    publishedAt: '2026-08-16T09:45:00Z',
    readingTime: 4,
    tags: ['Markets', 'Semiconductors', 'CapEx', 'Tech', 'Economy'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Technicians in clean-room suits calibrate a wafer alignment chamber.',
    imageCredit: 'WGO Markets / TSMC Press Pool',
    edition: ['Markets', 'Tech', 'Global']
  },
  {
    id: 'science-002',
    category: 'Science',
    title: 'CRISPR Epigenetic Therapy Reverses Age-Related Cellular Senescence in Preclinical Trials',
    subtitle: 'Targeted DNA methylation reprogramming restores metabolic vigor to damaged cardiovascular and neural tissues.',
    summary: 'A team of molecular geneticists in Boston has demonstrated that transient epigenetic editing can reset cellular biological age markers without erasing cellular identity, opening potential horizons for chronic disease prevention.',
    content: [
      'BOSTON — In a study published today in Nature Biotechnology, researchers demonstrated that epigenetic modification—altering chemical tags on DNA without changing the underlying genetic sequence—can restore youthful mitochondrial function in aged mammalian tissues.',
      'Unlike earlier cellular reprogramming experiments that risked inducing oncogenic transformations, the new protocol uses targeted dCas9 enzymes to selectively strip senescent methylation marks.',
      'Treated cardiovascular tissues exhibited a 42 percent recovery in arterial elasticity and microvascular blood flow within six weeks.',
      'Phase I human safety trials for targeted cardiovascular indications are currently pending regulatory clearance.'
    ],
    pullQuote: 'We are learning to rewrite the epigenetic software of the cell without corrupting the underlying genetic hardware.',
    author: {
      name: 'Dr. Evelyn Cross',
      role: 'Astronomy & Physics Correspondent',
      bio: 'Astrophysicist and science journalist reporting on cosmological discoveries and biotechnology.',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Boston, MA'
    },
    publishedAt: '2026-08-16T08:15:00Z',
    readingTime: 5,
    tags: ['Science', 'Biotech', 'Genetics', 'Medicine', 'Longevity'],
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Fluorescent microscopic visualization of chromatin structures inside human endothelial cells.',
    imageCredit: 'WGO / Broad Institute',
    edition: ['Science', 'Global']
  },
  {
    id: 'opinion-002',
    category: 'Opinion',
    title: 'The Quiet Sovereignty of the Walkable City',
    subtitle: 'When neighborhoods are designed for human steps rather than vehicular throughput, civic trust and social vitality naturally regenerate.',
    summary: 'The car-centric metropolis was an aberration of the twentieth century. Reclaiming our streets for human scale is the single most urgent democratic project of our era.',
    content: [
      'Stand on a Parisian corner in the 11th arrondissement on a Tuesday evening, and you witness something that cannot be measured in GDP: spontaneous human congregation.',
      'Children bike unaccompanied to the neighborhood bakery. Elders sit on shaded public benches without the obligation to purchase an espresso. The street is not a high-velocity transit pipe designed to evacuate commuters; it is a shared civic living room.',
      'When we surrender 60 percent of urban land to the private storage and high-speed motion of multi-ton steel machines, we do not merely destroy urban air quality—we dissolve the everyday social fabric that makes democracy possible.',
      'The fifteen-minute city is not a radical utopian fantasy. It is simply the restoration of human sanity to the places where we live.'
    ],
    pullQuote: 'The street is not a transit pipe designed to evacuate commuters; it is a shared civic living room.',
    author: {
      name: 'Jean-Luc Fontaine',
      role: 'Urbanist & Architecture Columnist',
      bio: 'Fellow at the Centre for Urban Futures and author of "Streets for the Living."',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Paris, France'
    },
    publishedAt: '2026-08-15T19:00:00Z',
    readingTime: 4,
    tags: ['Opinion', 'Cities', 'Urbanism', 'Community', 'Architecture'],
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Café patrons and pedestrians along a pedestrianized boulevard in Paris.',
    imageCredit: 'WGO / Laurent Baheux',
    isOpinion: true,
    edition: ['Culture', 'Global']
  },
  {
    id: 'india-003',
    category: 'India',
    title: 'ISRO Chandrayaan-4 Sample Return Mission Completes Lunar Surface Drilling Simulations',
    subtitle: 'Robotic core sample containers prepare to extract polar volatiles from the Moon’s permanently shadowed craters.',
    summary: 'Indian space scientists in Bengaluru completed critical qualification tests for the dual-launch lunar sample return spacecraft, aiming to bring back pristine deep-polar water ice to Earth laboratories by 2028.',
    content: [
      'BENGALURU — At the ISRO Satellite Integration Centre, engineers concluded a 72-hour continuous vacuum chamber test simulating the extreme cryogenic conditions of the lunar south pole.',
      'The Chandrayaan-4 mission architecture utilizes a modular docking mechanism in lunar orbit to transfer pressurized regolith canisters from the ascent stage to the Earth re-entry capsule.',
      'Analyzing pristine lunar polar volatiles will provide invaluable insights into the origins of water in the inner solar system and inform international planning for permanent crewed lunar habitats.'
    ],
    pullQuote: 'Chandrayaan-4 will unlock the ancient chemical archives preserved in the perpetual shadow of the lunar south pole.',
    author: {
      name: 'Priyanka Sen',
      role: 'South Asia Infrastructure & Energy Bureau Chief',
      bio: 'Investigating industrial transformations, aerospace missions, and energy policy across South Asia.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Bengaluru, India'
    },
    publishedAt: '2026-08-16T05:30:00Z',
    readingTime: 4,
    tags: ['India', 'Space', 'ISRO', 'Moon', 'Science'],
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The lunar surface and crater rim rendered from recent high-resolution orbital mapping data.',
    imageCredit: 'ISRO / Space Media Pool',
    edition: ['India', 'Science']
  },
  {
    id: 'world-003',
    category: 'World',
    title: 'Nordic Defence Pact Establishes Unified Arctic Air & Coastal Surveillance Command',
    subtitle: 'Sweden, Finland, Norway, and Denmark integrate radar grids to monitor High North waterways.',
    summary: 'A unified operations center in northern Norway will oversee joint air patrols and undersea acoustic sensor chains, cementing northern European collective security.',
    content: [
      'BODØ, NORWAY — Nordic defence ministers announced the full operational readiness of the Combined Arctic Surveillance Network, consolidating radar feeds, satellite passes, and maritime patrol squadrons under a single joint commander.',
      'The initiative streamlines airspace monitoring across the Arctic Circle and provides real-time situational awareness over strategic maritime chokepoints.',
      'Officials emphasized that the integration enhances search-and-rescue response times for commercial vessels navigating northern routes while ensuring regional deterrence.'
    ],
    pullQuote: 'Our four nations now see northern skies and waters through one seamless operational lens.',
    author: {
      name: 'Alexandre Mercer',
      role: 'Chief Diplomatic Correspondent',
      bio: 'Former foreign bureau chief covering international treaties, oceanic commerce, and security architecture.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Bodø, Norway'
    },
    publishedAt: '2026-08-15T16:10:00Z',
    readingTime: 4,
    tags: ['World', 'Nordic', 'Security', 'Arctic', 'Defence'],
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Coastal patrol vessels navigate fjord passages during joint northern exercises.',
    imageCredit: 'Nordic Defence Command / Torbjørn Kjosvold',
    edition: ['Global', 'US']
  },
  {
    id: 'tech-003',
    category: 'AI & Tech',
    title: 'Photonic Interconnects Enter Commercial Hyperscale Server Clusters',
    subtitle: 'Replacing copper traces with laser-guided silicon waveguides eliminates networking latency in massive AI clusters.',
    summary: 'Cloud infrastructure providers have begun deploying optical co-packaged switches, allowing 100,000-accelerator clusters to communicate at the speed of light with negligible thermal dissipation.',
    content: [
      'SAN JOSE, CA — The physical limit of copper wires in high-speed computing clusters was officially broken this morning as the first production optical switch fabrics came online.',
      'By converting electrical signals directly into multi-wavelength infrared photons at the processor socket, photonic interconnects achieve 10x bandwidth density while consuming 85% less energy per transmitted gigabit.',
      'Leading infrastructure architects described the deployment as the key architectural breakthrough enabling trillion-parameter reasoning models to scale without network congestion.'
    ],
    pullQuote: 'We have substituted copper cables with laser beams, liberating computing clusters from physical latency limits.',
    author: {
      name: 'Devin K. Chen',
      role: 'Senior Technology & Semiconductors Editor',
      bio: 'Covering microarchitecture, quantum systems, and artificial intelligence infrastructure across Silicon Valley.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'San Jose, CA'
    },
    publishedAt: '2026-08-16T17:50:00Z',
    readingTime: 4,
    tags: ['AI & Tech', 'Photonics', 'Data Centers', 'Networking', 'Hardware'],
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Fiber optic cabling arrays inside a high-throughput enterprise network hub.',
    imageCredit: 'WGO / Technology Infrastructure Press',
    edition: ['Tech', 'AI']
  },
  {
    id: 'visual-001',
    category: 'World',
    title: 'Nomads of the Frozen Steppe: The High-Altitude Reindeer Herders of Northern Mongolia',
    subtitle: 'A photographic journey into the sub-zero winter migrations of the Dukha community as ancient pastoral rhythms meet climate volatility.',
    summary: 'For thousands of years, the Dukha people have navigated the taiga forests of northern Khövsgöl. Acclaimed documentary photographer Sarah Van Der Meer spent four weeks documenting their high-altitude winter encampments.',
    content: [
      'KHÖVSGÖL, MONGOLIA — At temperatures plunging below minus 45 degrees Celsius, life in the high taiga requires a symbiotic rhythm between human resilience and animal adaptation.',
      'The Dukha, one of the last remaining nomadic reindeer-herding cultures on the planet, move their tipis across snow-bound mountain passes in response to moss availability and seasonal storm patterns.',
      'Through these striking photographic chronicles, we witness a community maintaining ancestral dignity in the face of shifting winter precipitation and encroaching modernization.'
    ],
    pullQuote: 'In the silence of the winter taiga, human footsteps and reindeer tracks become indistinguishable from the landscape.',
    author: {
      name: 'Sarah Van Der Meer',
      role: 'Documentary Visual Journalist',
      bio: 'National Geographic grantee and documentary photographer focusing on indigenous cultures and remote biomes.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      location: 'Ulaanbaatar, Mongolia'
    },
    publishedAt: '2026-08-15T12:00:00Z',
    readingTime: 3,
    tags: ['Visual Journalism', 'Photo Essay', 'Mongolia', 'Culture', 'Nomads'],
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'A Dukha elder guides a reindeer herd through fresh powder in the upper Khövsgöl taiga.',
    imageCredit: 'Sarah Van Der Meer / Magnum Photos',
    isVisual: true,
    edition: ['Global', 'Culture']
  }
];

export const DEMO_BRIEFINGS: BriefingItem[] = [
  {
    id: 'brief-001',
    timestamp: '10:15 AM',
    category: 'India',
    update: 'Commercial silicon wafers roll off ISO Class 1 cleanroom lines in Dholera, Gujarat, validating India’s 28nm semiconductor fab.',
    impact: 'High',
    articleId: 'india-lead-001'
  },
  {
    id: 'brief-002',
    timestamp: '09:48 AM',
    category: 'Markets',
    update: 'BSE Sensex surges +580 pts to breach 83,000 as foreign institutional capital and domestic mutual funds flow into Indian equities.',
    impact: 'High',
    articleId: 'india-lead-002'
  },
  {
    id: 'brief-003',
    timestamp: '09:25 AM',
    category: 'Science',
    update: 'ISRO completes 72-hour integrated environmental life-support qualification for Gaganyaan crew module at Sriharikota.',
    impact: 'High',
    articleId: 'india-lead-003'
  },
  {
    id: 'brief-004',
    timestamp: '09:05 AM',
    category: 'Climate',
    update: 'Western Green Energy Corridor begins pumping 5,000 MW from Khavda hybrid solar-wind park to northern industrial grids.',
    impact: 'Medium',
    articleId: 'india-inv-001'
  },
  {
    id: 'brief-005',
    timestamp: '08:42 AM',
    category: 'Sports',
    update: 'BCCI commissions high-rate optical motion capture and injury predictive telemetry at Bengaluru NCA.',
    impact: 'Medium',
    articleId: 'india-sports-001'
  },
  {
    id: 'brief-006',
    timestamp: '08:15 AM',
    category: 'AI & Tech',
    update: 'UPI bilateral settlement goes live across 48 nations, reducing cross-border merchant remittance friction to near-zero.',
    impact: 'High',
    articleId: 'india-lead-002'
  }
];

export const DEMO_MARKETS: MarketItem[] = [
  { symbol: 'SENSEX', name: 'BSE Sensex', value: '82,890.40', change: '+582.30 (+0.71%)', isPositive: true, region: 'India' },
  { symbol: 'NIFTY 50', name: 'Nifty 50', value: '25,320.15', change: '+178.60 (+0.71%)', isPositive: true, region: 'India' },
  { symbol: 'BANK NIFTY', name: 'Nifty Bank', value: '52,140.80', change: '+412.50 (+0.80%)', isPositive: true, region: 'India' },
  { symbol: 'USD/INR', name: 'USD to INR', value: '₹83.84', change: '-0.08 (-0.10%)', isPositive: true, region: 'Forex' },
  { symbol: 'NIFTY IT', name: 'Nifty IT Index', value: '42,650.30', change: '+620.40 (+1.48%)', isPositive: true, region: 'India' },
  { symbol: 'GOLD 24K', name: 'Gold (10g / INR)', value: '₹76,450', change: '+₹210 (+0.28%)', isPositive: true, region: 'Commodities' },
  { symbol: 'BRENT', name: 'Crude Oil', value: '$78.45', change: '-$0.85 (-1.07%)', isPositive: false, region: 'Commodities' },
  { symbol: 'NASDAQ', name: 'Nasdaq Composite', value: '18,442.15', change: '+189.60 (+1.04%)', isPositive: true, region: 'US' },
  { symbol: 'S&P 500', name: 'S&P 500', value: '5,688.20', change: '+42.10 (+0.75%)', isPositive: true, region: 'US' }
];

export const DEMO_WEATHER: Record<string, WeatherData> = {
  'New Delhi': { city: 'New Delhi', condition: 'Clear Sky', temp: 32, high: 36, low: 26, humidity: 52, icon: 'Sun' },
  Mumbai: { city: 'Mumbai', condition: 'Coastal Breeze', temp: 30, high: 32, low: 26, humidity: 74, icon: 'CloudSun' },
  Bengaluru: { city: 'Bengaluru', condition: 'Pleasant & Mild', temp: 24, high: 27, low: 19, humidity: 60, icon: 'CloudSun' },
  Chennai: { city: 'Chennai', condition: 'Tropical Sun', temp: 33, high: 35, low: 27, humidity: 68, icon: 'Sun' },
  Kolkata: { city: 'Kolkata', condition: 'Partly Sunny', temp: 31, high: 34, low: 26, humidity: 70, icon: 'CloudSun' },
  Hyderabad: { city: 'Hyderabad', condition: 'Partly Cloudy', temp: 28, high: 31, low: 22, humidity: 58, icon: 'Cloud' },
  Ahmedabad: { city: 'Ahmedabad', condition: 'Warm & Dry', temp: 35, high: 38, low: 27, humidity: 44, icon: 'Sun' },
  Pune: { city: 'Pune', condition: 'Breezy', temp: 26, high: 29, low: 20, humidity: 62, icon: 'CloudSun' },
  Jaipur: { city: 'Jaipur', condition: 'Sunny', temp: 34, high: 37, low: 25, humidity: 40, icon: 'Sun' },
  London: { city: 'London', condition: 'Partly Cloudy', temp: 21, high: 23, low: 15, humidity: 62, icon: 'CloudSun' },
  'New York': { city: 'New York', condition: 'Sunny', temp: 27, high: 29, low: 19, humidity: 48, icon: 'Sun' }
};

export const DEMO_COLUMNISTS: Columnist[] = [
  {
    id: 'col-001',
    name: 'Aarav Nambiar',
    role: 'Senior Technology Columnist & Public Goods Theorist',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80',
    headline: 'The Digital Public Goods Dividend: Why India’s Open Stack Is the True Blueprint for the Global South',
    excerpt: 'When critical foundational infrastructure—identity, instant payments, and open commerce—is built as an un-monopolized public utility, democratic capitalism accelerates beyond proprietary walled gardens.',
    articleId: 'india-lead-002',
    category: 'Digital Sovereignty'
  },
  {
    id: 'col-002',
    name: 'Dr. Radhika Sen',
    role: 'Macroeconomist & Industrial Strategy Fellow',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
    headline: 'Beyond Metros: Why India’s Tier-2 & Tier-3 Hubs Are Powering the Next Phase of Growth',
    excerpt: 'With expressways, dedicated freight corridors, and decentralized engineering universities, cities like Indore, Surat, and Coimbatore are reshaping the national manufacturing map.',
    articleId: 'india-lead-001',
    category: 'Indian Economics'
  },
  {
    id: 'col-003',
    name: 'Jean-Luc Fontaine',
    role: 'Urbanist & Transit Systems Analyst',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    headline: 'The Quiet Sovereignty of High-Speed Rail in Dense Megacities',
    excerpt: 'Connecting metropolitan hubs with rapid electric rail corridors transforms regional productivity and slashes aviation emissions simultaneously.',
    articleId: 'opinion-002',
    category: 'Urban Living'
  },
  {
    id: 'col-004',
    name: 'Aisha Rao',
    role: 'Technology Ethicist & Legal Scholar',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    headline: 'The Sovereign AI Mandate: Preserving Linguistic Pluralism Across Indic Dialects',
    excerpt: 'Building frontier AI models trained natively on India’s 22 constitutionally recognized languages ensures digital self-determination.',
    articleId: 'tech-001',
    category: 'Digital Rights'
  }
];

export const DEMO_VISUAL_STORIES: VisualStory[] = [
  {
    id: 'vis-india-001',
    title: 'Ghats of Eternity: Morning Light & Timeless Devotion Along the Sacred Ganges in Varanasi',
    subtitle: 'A visual celebration of ancient rituals, morning sabhas, and architectural heritage at dawn along the Banaras riverfront.',
    photographer: 'Arjun Dasgupta',
    location: 'Varanasi, Uttar Pradesh, India',
    coverImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    description: 'As the morning mist lifts over the sacred Ganges, centuries-old stone ghats come alive with spiritual chanting, classical sitar practice, boatmen gliding across golden ripples, and the enduring rhythm of India’s spiritual capital.',
    articleId: 'culture-001',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
        caption: 'Devotees gather along Dashashwamedh Ghat as dawn illuminates the ancient stone steps.',
        credit: 'Arjun Dasgupta / WGO'
      },
      {
        url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
        caption: 'Wooden rowing boats cross the golden reflection of the morning sun across the sacred river.',
        credit: 'Arjun Dasgupta / WGO'
      },
      {
        url: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80',
        caption: 'The evening Ganga Aarti ceremony illuminated by brass lamps and devotional chanting.',
        credit: 'Arjun Dasgupta / WGO'
      }
    ]
  },
  {
    id: 'vis-002',
    title: 'Nomads of the Frozen Steppe: The High-Altitude Herders of Khövsgöl',
    subtitle: 'Four weeks embedded with the Dukha reindeer herders of northern Mongolia amidst minus 40°C sub-zero migrations.',
    photographer: 'Sarah Van Der Meer',
    location: 'Khövsgöl Province, Mongolia',
    coverImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
    description: 'As seasonal precipitation shifts and industrial encroachments narrow ancient migration corridors, the Dukha community continues an ancient, unbroken pact with the sub-zero taiga.',
    articleId: 'visual-001',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
        caption: 'A Dukha elder leads his reindeer across the frozen mountain ridge at daybreak.',
        credit: 'Sarah Van Der Meer / WGO'
      },
      {
        url: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?auto=format&fit=crop&w=1200&q=80',
        caption: 'Traditional canvas tipis withstand night-time snowstorms at 2,400 meters elevation.',
        credit: 'Sarah Van Der Meer / WGO'
      }
    ]
  }
];

// Dynamically compute recent publication timestamps so fallback state remains current
export const DEMO_ARTICLES_DYNAMIC: Article[] = DEMO_ARTICLES.map((art, idx) => {
  const minsAgo = idx * 25 + 5;
  const pubDate = new Date(Date.now() - minsAgo * 60000).toISOString();
  return {
    ...art,
    publishedAt: pubDate,
    updatedAt: new Date(Date.now() - Math.max(1, minsAgo - 10) * 60000).toISOString(),
  };
});

// Aliases for clean component imports
export const ARTICLES = DEMO_ARTICLES_DYNAMIC;
export const VISUAL_STORIES = DEMO_VISUAL_STORIES;
export const COLUMNISTS = DEMO_COLUMNISTS;
export const BRIEFING_ITEMS = DEMO_BRIEFINGS.map((item, idx) => ({
  ...item,
  timestamp: idx === 0 ? 'Just now' : `${(idx + 1) * 12}m ago`,
}));
export const BREAKING_NEWS = DEMO_ARTICLES_DYNAMIC.filter(a => a.isBreaking || a.featured);
export const MARKET_TICKERS = DEMO_MARKETS;
export const WEATHER_REPORTS = DEMO_WEATHER;
