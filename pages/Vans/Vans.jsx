import React, { Suspense, useState } from "react"
import { Link, useLoaderData, useSearchParams, defer, Await } from "react-router-dom"
import { getVans } from "../../api";

/**
 * {
    * id: "1", 
    * name: "Modest Explorer", 
    * price: 60, 
    * description: "The Modest Explorer is a van designed to get you out of the house and into nature. This beauty is equipped with solar panels, a composting toilet, a water tank and kitchenette. The idea is that you can pack up your home and escape for a weekend or even longer!", 
    * imageUrl: "https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png", 
    * type: "simple"
 * }
 */


export function loader() {

    return defer({ vans: getVans() });
}


export default function Vans() {

    const [searchParams, setSearchparams] = useSearchParams();
    //const [vans, setVans] = React.useState([])

    // const [loading, setLoading] = React.useState(false)
    // const [error, setError] = React.useState(null)

    const dataPromise = useLoaderData()


    //throw new Error('vans error')

    const typeFilter = searchParams.get("type")




    function handleFilterChange(key, value) {
        setSearchparams(preParams => {
            if (value) {
                preParams.set(key, value);
            } else {
                preParams.delete(key)
            }
            return preParams;
        })
    }

    function renderVanElements(vans){
        const displayedVans = typeFilter ? vans.filter(item => item.type == typeFilter) : vans

        const vanElements = displayedVans.map(van => (
            <div key={van.id} className="van-tile">
                <Link to={`${van.id}`} state={{ search: `?${searchParams.toString()}`, type: typeFilter }} >
                    <img alt={van.name} src={van.imageUrl} />
                    <div className="van-info">
                        <h3>{van.name}</h3>
                        <p>${van.price}<span>/day</span></p>
                    </div>
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                </Link>
            </div>
        ))
        return <>
            <div className="van-list-filter-buttons">
                <button

                    onClick={() => handleFilterChange('type', 'simple')}
                    className={`van-type simple ${typeFilter == 'simple' ? 'selected' : ''}`}
                >Simple</button>
                <button

                    onClick={() => handleFilterChange('type', 'luxury')}
                    className={`van-type luxury ${typeFilter == 'luxury' ? 'selected' : ''}`}
                >Luxury</button>
                <button

                    onClick={() => handleFilterChange('type', 'rugged')}
                    className={`van-type rugged ${typeFilter == 'rugged' ? 'selected' : ''}`}
                >Rugged</button>
                {
                    typeFilter ?

                        <button
                            onClick={() => handleFilterChange('type', null)}
                            className="van-type clear-filters"
                        >Clear filter</button>
                        : null
                }

            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </>
    }


    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <Suspense fallback={<h2>waiting...</h2>} >
            <Await resolve={dataPromise.vans}>
                {renderVanElements}

            </Await>
            </Suspense>
        </div>
    )
}