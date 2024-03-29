import type {EntityInterface} from '~/types/entity'
import {useDate} from 'vuetify'

// const TIME_BETWEEN_FETCH = 10000
export const useFetchEntityStore = <EntityType extends EntityInterface>(
  entity: string,
) =>
  defineStore(`${entity}-generic-store`, () => {
    const lastFetchTime = ref(0)

    /** Init Fetch refs for entity */
    const {
      data,
      refresh: forceRefresh,
      pending,
      error,
    } = useFetch<EntityType[]>(`/api/${entity}`, {
      default: () => [] as EntityType[],
      onResponse(context) {
        if (!context.response.ok) lastFetchTime.value = 0
      },
    })

    /**
     * Rafraîchit les données si le temps écoulé depuis la
     * dernière récupération dépasse 10000 millisecondes.
     */
    const refreshData = async () => {
      if (Date.now() - lastFetchTime.value > 10000) {
        await forceRefresh() // Force le rafraîchissement
        lastFetchTime.value = Date.now()
      }
    }

    return {
      data,
      pending,
      refreshData,
      forceRefresh,
      error,
    }
  })()
