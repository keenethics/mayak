export function transformEventData(data, tags) {
  let tagsObject = {};
  let linkObject = {};

  if (tags && tags.length > 0) {
    tagsObject = {
      connectOrCreate: tags.map(tag => ({ where: { name: tag.value }, create: { name: tag.value } })),
    };
  }

  if (data?.additionalLink?.label && data?.additionalLink?.link) {
    const linkData = { label: data.additionalLink.label, link: data.additionalLink.link };
    linkObject = {
      connectOrCreate: {
        where: { label_link: linkData },
        create: linkData,
      },
    };
  }

  return {
    ...data,
    tags: tagsObject,
    additionalLink: linkObject,
  };
}
