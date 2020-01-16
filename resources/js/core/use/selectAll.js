import useIndexStore from './indexStore'
import { computed } from '@vue/composition-api'

export default function ({name}) {
    return {
        ...useIndexStore(name),
    }
}
