// this function formats the event form data, connects event to other tables and create proper prisma creation object
export function transformEventCreateData(data, tags) {
  let tagsObject = {};
  let linkObject = {};

  if (tags?.length > 0) {
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
    price: data.priceType === 'FREE' ? null : data.price,
    address: data.format === 'ONLINE' ? null : data.address,
    locationLink: data.format === 'ONLINE' ? null : data.locationLink,
  };
}
