const mapChoices = item => ({
  id: item?.id ?? item.toLowerCase(),
  name: item?.name ?? item,
});

const getChoicesList = (list, callback = mapChoices) => list?.map(callback);

export { getChoicesList };
