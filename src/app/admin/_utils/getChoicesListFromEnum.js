export function getChoicesListFromEnum(prismaEnumObject) {
  const enumList = Object.values(prismaEnumObject);
  return enumList.map(item => ({
    id: item,
    name: item.toLowerCase(),
  }));
}
