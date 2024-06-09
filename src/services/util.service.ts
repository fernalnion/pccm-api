export const calculateCarbonEmission = (
  activityAmount: number,
  emissionFactor: number,
) => {
  return activityAmount * emissionFactor;
};

export const calculateCarbonCredit = (carbonEmissions: number) => {
  return carbonEmissions * (1 / 1000); // 1 credit for 1000 carbon emissions
};
