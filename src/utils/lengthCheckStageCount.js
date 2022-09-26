export const checkLengthStage = (stageLists, stageName) => {
    const result = stageLists?.filter((f) => f?.stage === stageName).length;
    return result
};

