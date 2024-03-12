export function getSpecialistFullName(specialist) {
  return `${specialist.lastName} ${specialist.firstName}${specialist.surname ? ' '.concat(specialist.surname) : ''}`;
}
