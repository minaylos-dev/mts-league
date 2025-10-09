export default (data) => {
  return {
    id: data.id,
    isExpert: data.is_expert,
    settings: {
      expertVoteEnabled: data.settings.expert_vote_enabled,
      userVoteEnabled: data.settings.user_vote_enabled,
    },
  };
};
