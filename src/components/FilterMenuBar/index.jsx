import { Chip, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import React, { useState } from "react"
import styles from "./index.module.css"
import { DatePicker, DateTimePicker } from "@mui/lab"
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
                <div>
                    <FormControl fullWidth sx={{ flexDirection: "row" }}>
                        <InputLabel id="createdAt_sort">Erstelldatum</InputLabel>
                        <Select
                            className={styles.Select}
                            labelId="createdAt_sort"
                            label="Erstelldatum"
                            id="createdAt_sort"
                            value=""
                            onChange={(e) => {
                                addSortFilter(e.target.value.param, "createdAt", e.target.value.label)
                            }}
                        >
                            <MenuItem value={{ param: "asc", label: "Erstelldatum aufsteigend" }}>aufsteigend</MenuItem>
                            <MenuItem value={{ param: "desc", label: "Erstelldatum absteigend" }}>absteigend</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <FormControl fullWidth sx={{ flexDirection: "row" }}>
                        <InputLabel id="Angebotsende_sort">Angebotsende</InputLabel>
                        <Select
                            className={styles.Select}
                            labelId="Angebotsende_sort"
                            label="Angebotsende"
                            id="Angebotsende_sort"
                            value=""
                            onChange={(e) => {
                                addSortFilter(e.target.value.param, "offer.endDate", e.target.value.label)
                            }}
                        >
                            <MenuItem value={{ param: "asc", label: "Erstelldatum aufsteigend" }}>aufsteigend</MenuItem>
                            <MenuItem value={{ param: "desc", label: "Erstelldatum absteigend" }}>absteigend</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <DateTimePicker
                        label="Angebotsende nach dem ..."
                        inputFormat="dd.MM.yyyy"
                        value={dateState}
                        onChange={(date) => {
                            setDateState(date)
                            addCustomFilter(
                                "offerActive",
                                encodeURIComponent(JSON.stringify({ $gte: date })),
                                "Angebotsende nach dem " + date.toLocaleString()
                            )
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </div>
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
