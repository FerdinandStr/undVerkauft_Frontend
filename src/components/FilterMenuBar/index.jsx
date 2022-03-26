import { Chip, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { React, useState } from "react"
import styles from "./index.module.css"
import { DatePicker } from "@mui/lab"
import { style } from "@mui/system"

const defaultFilters2 = [
    { param: "endDate", value: "asc", desc: "Endet bald" },
    { param: "endDate", value: "desc", desc: "Endet nicht bald" },
    { param: "lastPrice", value: "asc", desc: "Niedrigster Preis" },
    { param: "lastPrice", value: "desc", desc: "Höchster Preis" },
    { param: "name", value: "" },
    { param: "desc", value: "name_lower" },
    { param: "desc", value: "createdAt" },
]

function useFilterState() {
    const filterState = useState([])
    const [filterArray, setFilterArray] = filterState

    function addSearchFilter(value) {
        if (!filterArray.some((filter) => filter.param === "name_lower" && filter.value === value)) {
            setFilterArray([...filterArray, { param: "name_lower", value: value }])
        }
    }

    function addSortFilter(param, value, label) {
        const arrayWithoutSameFilter = filterArray.filter(
            (filter) => !((filter.param === "asc" || filter.param === "desc") && filter.value === value)
        )
        setFilterArray([...arrayWithoutSameFilter, { param: param, value: value, label: label }])
    }

    function addCustomFilter(param, value, label) {
        if (!filterArray.some((filter) => filter.param === param && filter.value === value)) {
            setFilterArray([...filterArray, { param: param, value: value, label: label }])
        }
    }

    function removeSearchFilter(value) {
        setFilterArray(filterArray.filter((el) => el.value !== value))
    }

    return { filterArray, addSearchFilter, addSortFilter, addCustomFilter, removeSearchFilter }
}

function FilterMenuBar({ filterState }) {
    const { filterArray, addSortFilter, addCustomFilter, removeSearchFilter } = filterState
    const [dateState, setDateState] = useState(null)

    return (
        <div className={styles.FilterMenuBar}>
            <div className={styles.FilterSelection}>
                <FormControl fullWidth sx={{ flexDirection: "row" }}>
                    <InputLabel id="createdAt_sort">Erstelldatum</InputLabel>
                    <Select
                        className={styles.Select}
                        labelId="createdAt_sort"
                        label="Erstelldatum"
                        id="createdAt_sort"
                        // variant="outlined"
                        value=""
                        onChange={(e) => {
                            addSortFilter(e.target.value.param, "createdAt", e.target.value.label)
                        }}
                    >
                        <MenuItem value={{ param: "asc", label: "Erstelldatum aufsteigend" }}>aufsteigend</MenuItem>
                        <MenuItem value={{ param: "desc", label: "Erstelldatum absteigend" }}>absteigend</MenuItem>
                    </Select>

                    {/* <InputLabel id="createdAt_sort">Gebot aktiv</InputLabel>
                <Select
                    labelId="createdAt_sort"
                    id="createdAt_sort"
                    value=""
                    onChange={(e) => {
                        addCustomFilter("offerActive", e.target.value.value, e.target.value.label)
                    }}
                >
                    <MenuItem value={{ value: encodeURIComponent({ $gte: new Date() }), label: "Alle Angebote" }}>Alle Angebote</MenuItem>
                    <MenuItem value={{ value: encodeURIComponent(JSON.stringify({ $gte: new Date() })), label: "Nur aktive Angebote" }}>
                        Nur aktive Angebote
                    </MenuItem>
                </Select> */}

                    <DatePicker
                        // type="date"
                        label="Angebotsende nach dem ..."
                        value={dateState}
                        onChange={(date) => {
                            setDateState(date)
                            addCustomFilter(
                                "offerActive",
                                encodeURIComponent(JSON.stringify({ $gte: date })),
                                "Angebotsende nach dem " + date.toLocaleDateString()
                            )
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </FormControl>
            </div>
            <div className={styles.ChipContainer}>
                {filterArray.map((filter, i) => (
                    <Chip
                        key={i}
                        className={styles.Chip}
                        label={filter.label || filter.value}
                        variant="outlined"
                        onDelete={() => {
                            removeSearchFilter(filter.value)
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export { useFilterState, FilterMenuBar }
