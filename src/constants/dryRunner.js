export const PROBABILITIES = {
  NO_MOVEMENT_TOKEN: 1,
  DAWNSPARKS_STAYS: 0.71,
  DAWNSPARKS_HITS: 0.71,
  FROZEN_CORE_STAYS: 0.5,
  AHMI_RETURNS: 0.5,
}

export const FRIENDLY_CHANCES = {
  W9: PROBABILITIES.FROZEN_CORE_STAYS,
  S3: PROBABILITIES.AHMI_RETURNS,
  W16: PROBABILITIES.DAWNSPARKS_HITS * PROBABILITIES.DAWNSPARKS_STAYS,
}
