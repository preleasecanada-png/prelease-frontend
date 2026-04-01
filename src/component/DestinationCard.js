import Link from 'next/link';
import React, { memo, useContext, useEffect } from 'react'
import { CreateApiContext } from '../ContextApi/CreateApiContext';
import { imageBaseUrl } from '../Helper/helper';
import { useRouter } from 'next/router';

const DestinationCard = memo(() => {
    // const { fetchCities, cities, loader } = useContext(CreateApiContext);
    const { loader, properties, fetchProperties } = useContext(CreateApiContext);
    // useEffect(() => {
    //     if (cities?.length === 0) {
    //         fetchCities();
    //     }
    // }, []);


    useEffect(() => {
        if (properties?.length == 0) {
            fetchProperties();
        }
    }, []);
    return (
        <>
            {loader ?
                (
                    <>
                        <div className='city_skeleton_main'>
                            <div className="skeleton-card">
                                <div className="card-img skeleton">
                                </div>
                                <h2 className="card-title skeleton">
                                </h2>
                                <p className="card-intro skeleton">
                                </p>
                            </div>
                            <div className="skeleton-card">
                                <div className="card-img skeleton">
                                </div>
                                <h2 className="card-title skeleton">
                                </h2>
                                <p className="card-intro skeleton">
                                </p>
                            </div>
                            <div className="skeleton-card">
                                <div className="card-img skeleton">
                                </div>
                                <h2 className="card-title skeleton">
                                </h2>
                                <p className="card-intro skeleton">
                                </p>
                            </div>
                            <div className="skeleton-card">
                                <div className="card-img skeleton">
                                </div>
                                <h2 className="card-title skeleton">
                                </h2>
                                <p className="card-intro skeleton">
                                </p>
                            </div>
                            <div className="skeleton-card">
                                <div className="card-img skeleton">
                                </div>
                                <h2 className="card-title skeleton">
                                </h2>
                                <p className="card-intro skeleton">
                                </p>
                            </div>
                            <div className="skeleton-card">
                                <div className="card-img skeleton">
                                </div>
                                <h2 className="card-title skeleton">
                                </h2>
                                <p className="card-intro skeleton">
                                </p>
                            </div>
                        </div>
                    </>
                )
                : (properties && properties?.map((property, index) => (
                    <Link href={`/destination/${property?.slug}`} className='placement_card' key={index}>
                        <div className='place_thumb'>
                            <img src={imageBaseUrl(property?.property_images[0]?.original)} alt={property?.title} />
                        </div>
                        <div className='place_heading'>
                            <h4>{property?.title}</h4>
                            <p>{property?.description}</p>
                        </div>
                    </Link>
                )))}
        </>
    )
});

DestinationCard.displayName = 'DestinationCard';

export default DestinationCard;