// this function formats the event edit form data,
// disconnects event record from related tables if needed
// and create proper prisma update object
export function transformEventEditData(data, tags, previousData) {
  const { tags: prevTags, additionalLink: prevLink, linkId } = previousData;

  const linkObject = {};
  const tagsObject = {};

  const { additionalLink: newLink } = data;

  const linkChanged = newLink?.label !== prevLink?.label || newLink?.link !== prevLink?.link;

  if (linkChanged && newLink?.label && newLink?.link) {
    const linkData = { label: newLink.label, link: newLink.link };
    linkObject.connectOrCreate = {
      where: { label_link: linkData },
      create: linkData,
    };
  }

  // we need to cover case when we remove existing additional link separately
  if (linkId && linkChanged && !newLink?.label && !newLink?.link) {
    linkObject.disconnect = { id: linkId };
  }

  if (tags) {
    // this variable stores tags, that should be disconnected from event
    // it is calculated as difference between new tags and previous tags
    const tagDifference = prevTags.filter(newTag => !tags.some(tag => tag.value === newTag.name));
    tagsObject.disconnect = tagDifference.map(tag => ({ name: tag.name }));
  }

  if (tags?.length > 0) {
    tagsObject.connectOrCreate = tags.map(tag => ({ where: { name: tag.value }, create: { name: tag.value } }));
  }

  return {
    ...data,
    tags: tagsObject,
    additionalLink: linkObject,
    price: data.priceType === 'FREE' ? null : data.price,
    address: data.format === 'ONLINE' ? null : data.address,
    locationLink: data.format === 'ONLINE' ? null : data.locationLink,
  };
}
