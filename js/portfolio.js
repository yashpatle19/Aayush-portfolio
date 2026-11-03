window.PORTFOLIO_ITEMS = [
  {
    id: 'early-engagement',
    filters: ['linkedin', 'engagement'],
    platform: 'LinkedIn',
    type: 'Service example',
    title: 'Early Engagement Support',
    description: 'Coordinate authentic early interactions around published posts to encourage relevant audience participation.',
    problem: 'A post may not immediately reach the people most likely to find it relevant, which can limit the chance for useful discussion to begin.',
    approach: 'Plan timely, authentic interactions with relevant audiences after publication. Participation stays voluntary and contextual; no algorithmic boost or reach outcome is promised.',
    deliverables: 'Engagement planning, timing coordination, relevant audience targeting, and performance tracking.',
    metrics: 'Review time to first relevant interaction, relevance of replies, reach, and engagement patterns where analytics are available. Compare with the account’s own baseline over an agreed period; do not set a guaranteed interaction volume.'
  },
  {
    id: 'meaningful-comments',
    filters: ['linkedin', 'x', 'engagement'],
    platform: 'LinkedIn / X',
    type: 'Service example',
    title: 'Meaningful Comment Strategy',
    description: 'Encourage thoughtful, relevant discussion that adds value to the original post and its audience.',
    problem: 'Generic or promotional replies can distract from a post instead of helping its audience have a useful conversation.',
    approach: 'Set clear comment guidelines, prepare open-ended discussion prompts, identify relevant conversations, and coordinate authentic responses from authorized participants.',
    deliverables: 'Comment guidelines, discussion prompts, relevant conversation opportunities, and response coordination.',
    metrics: 'Review relevance and quality of comments, replies from the intended audience, and whether conversations continue constructively. Do not use comment quotas or repetitive copy-paste replies.'
  },
  {
    id: 'repost-amplification',
    filters: ['linkedin', 'x', 'engagement'],
    platform: 'Cross-platform',
    type: 'Service example',
    title: 'Repost & Content Amplification',
    description: 'Extend content distribution through relevant, voluntary reposts and sharing opportunities.',
    problem: 'Useful posts can remain within one account’s existing audience even when related communities may find them relevant.',
    approach: 'Plan organic sharing opportunities across relevant accounts and channels. Any repost must be voluntary, contextually appropriate, and made by an authorized account.',
    deliverables: 'Sharing strategy, distribution planning, relevant account identification, and tracking.',
    metrics: 'Track voluntary reposts or shares, additional reach, referral visits where available, and engagement quality. Compare with the account’s baseline without promising an increase.'
  },
  {
    id: 'creator-collaboration',
    filters: ['linkedin', 'x', 'engagement'],
    platform: 'Cross-platform',
    type: 'Service example',
    title: 'Creator Collaboration',
    description: 'Identify relevant creators and complementary audiences for potential collaborations and content partnerships.',
    problem: 'Potentially relevant partners can be hard to identify without a clear fit between expertise, audience, and topic.',
    approach: 'Research relevant prospects and plan respectful, transparent outreach. Contact happens only with client approval; no partnership is assumed until both parties agree.',
    deliverables: 'Prospect research, collaboration outreach planning, content coordination, and follow-up tracking.',
    metrics: 'Review prospect fit, approved outreach responses, qualified conversations, and agreed collaboration activity. Record outcomes only after they occur.'
  },
  {
    id: 'post-performance-review',
    filters: ['planning'],
    platform: 'Planning & profiles',
    type: 'Service example',
    title: 'Post Performance Review',
    description: 'Review available post analytics to understand engagement patterns and identify opportunities to improve future content.',
    problem: 'Without a regular review, it can be difficult to tell which topics and formats are drawing relevant attention.',
    approach: 'Review available post analytics in context, note patterns and limitations, then suggest practical adjustments for future client-supplied posts.',
    deliverables: 'Reach and engagement review, relevant metrics, observations, and practical recommendations.',
    metrics: 'Review reach or impressions, relevant engagement, clicks where available, and changes against the account’s own baseline. Metrics describe observed activity, not guaranteed outcomes.'
  }
];

(() => {
  const grid = document.querySelector('#portfolio-grid');
  if (!grid) return;
  const filters = [...document.querySelectorAll('.filter-button')];
  const dialog = document.querySelector('#work-dialog');
  const closeButton = dialog?.querySelector('.dialog-close');
  let previousFocus = null;

  const showDetails = item => {
    if (!dialog) return;
    previousFocus = document.activeElement;
    dialog.querySelector('#dialog-platform').textContent = `${item.platform} / SERVICE EXAMPLE`;
    dialog.querySelector('#dialog-title').textContent = item.title;
    dialog.querySelector('#dialog-type').textContent = item.type;
    dialog.querySelector('#dialog-problem').textContent = item.problem;
    dialog.querySelector('#dialog-approach').textContent = item.approach;
    dialog.querySelector('#dialog-deliverables').textContent = item.deliverables;
    dialog.querySelector('#dialog-metrics').textContent = item.metrics;
    dialog.showModal();
    closeButton?.focus();
  };

  const render = filterName => {
    const items = window.PORTFOLIO_ITEMS.filter(item => filterName === 'all' || item.filters.includes(filterName));
    grid.replaceChildren();

    if (!items.length) {
      const emptyState = document.createElement('p');
      emptyState.className = 'no-results';
      emptyState.textContent = 'No service examples are available in this category yet.';
      grid.append(emptyState);
      return;
    }

    items.forEach(item => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'work-card';
      card.dataset.item = item.id;
      card.setAttribute('aria-label', `${item.title}, ${item.platform}, service example. View details.`);
      card.innerHTML = `<span class="work-meta"><span class="work-platform">${item.platform.toUpperCase()}</span><span>DEMO</span></span><span class="work-card-content"><h3>${item.title}</h3><p>${item.description}</p></span><span class="work-card-foot"><strong>${item.type}</strong><span>View sample ↗</span></span>`;
      card.addEventListener('click', () => showDetails(item));
      grid.append(card);
    });
  };

  filters.forEach(filter => filter.addEventListener('click', () => {
    filters.forEach(button => {
      const active = button === filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    render(filter.dataset.filter);
  }));

  closeButton?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog?.addEventListener('close', () => previousFocus?.focus());
  render('all');
})();
