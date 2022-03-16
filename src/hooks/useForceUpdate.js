//just a helper to reload useEffects on forceUpdate call

import { useState } from "react"

export default function useForceUpdate() {
    const [trigger, setValue] = useState(0)
    function forceUpdate() {
        setValue((value) => value + 1)
    }
    return [trigger, forceUpdate]
}
