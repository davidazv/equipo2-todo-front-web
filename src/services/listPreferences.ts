const PREFS_KEY = 'edutask_list_prefs'

interface ListPref {
  color: string
}

export function loadPrefs(): Record<string, ListPref> {
  try {
    return JSON.parse(localStorage.getItem(PREFS_KEY) ?? '{}') as Record<string, ListPref>
  } catch {
    return {}
  }
}

export function savePref(id: string, pref: ListPref): void {
  const prefs = loadPrefs()
  prefs[id] = pref
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs))
}
