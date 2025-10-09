import { nominationsList } from '@/config/nominations';
import { cleanObject } from '@/tools/cleanObject';

export default (data) => {
  const slug = nominationsList.find((item) => item.id === data.nomination_id)?.slug;
  const image = data.image ? data.image : `/images/applications/${slug}/${data.image_index}.png`;

  return {
    id: data.id,
    nominationId: data.nomination_id,
    totalPoints: data.total_points,
    isVoted: data.is_voted,
    image,
    application: cleanObject({
      fullName: data.application?.full_name,
      description: data.application?.description,
      name: data.application?.name,
      leader: data.application?.leader,
      goal: data.application?.goal,
      objectives: data.application?.objectives,
      digitalSolutions: data.application?.digital_solutions,
      results: data.application?.results,
      budget: data.application?.budget,
      contribution: data.application?.contribution,
      coverage: data.application?.coverage,
      departmentId: data.application?.department_id,
      novelty: data.application?.novelty,
      preconditions: data.application?.preconditions,
      scaling: data.application?.scaling,
      team: data.application?.team,
      teamMembers: data.application?.team_members,
      achievements: data.application?.achievements || [],

      companyValues: data.application?.company_values?.length
        ? data.application?.company_values.map((value) => ({
            companyValueId: value.company_value_id,
            description: value.description,
          }))
        : [],
    }),
  };
};
