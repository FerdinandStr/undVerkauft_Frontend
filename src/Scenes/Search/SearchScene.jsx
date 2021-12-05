import React from "react"

function SearchScene(params) {
    const { items } = params

    console.log(items)

    return (
        <div>
            {items
                ? items.map((item) => (
                      <div id={item.id}>
                          <h1>{item.name}</h1>
                      </div>
                  ))
                : null}
        </div>
    )
}

export default SearchScene
