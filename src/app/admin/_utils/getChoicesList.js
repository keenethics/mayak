const mapChoices = item => ({
  id: item?.id ?? item,
  name: item?.name ?? item.toLowerCase(),
});

const getChoicesList = (list, callback = mapChoices) => list?.map(callback);

export { getChoicesList };
