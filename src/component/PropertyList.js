import React, { memo, useState } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import { imageBaseUrl } from '../Helper/helper';

// ─── Status Badge ────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
    const statusClass = status ? `status-badge status-badge--${status.toLowerCase()}` : 'status-badge';
    return (
        <span className={statusClass}>
            {status}
        </span>
    );
};

const PropertyCard = memo(({ place }) => {
    const sliderSettings = {
        dots: true,
        arrows: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: false,
    };

    return (
        <div className="property-card">
            <div className="property-card__image-wrapper">
                <StatusBadge status='Active' />
                <Slider {...sliderSettings}>
                    {place?.property_images?.map((img, i) => (
                        <div key={i}>
                            <img
                                src={imageBaseUrl(img?.original)}
                                alt={`Slide ${i + 1}`}
                                className="property-card__image"
                            />
                        </div>
                    ))}
                </Slider>
            </div>

            <Link href={`/property-detail/${place?.slug}/${place?.id}`} className="property-card__link">
                <div className="property-card__info">
                    <h3 className="property-card__title">{place?.title}</h3>
                    <p className="property-card__host">Hosted by {place?.user?.first_name}</p>
                    <span className="property-card__price">
                        ${place?.set_your_price}{' '} per guest
                    </span>
                </div>
            </Link>
        </div>
    );
});

const SkeletonCard = () => (
    <div className="property-card property-card--skeleton">
        <div className="skeleton property-card__skeleton-img" />
        <div className="skeleton property-card__skeleton-line property-card__skeleton-line--wide" />
        <div className="skeleton property-card__skeleton-line property-card__skeleton-line--narrow" />
    </div>
);

const FILTERS = ['All', 'Active', 'Upcoming', 'Ended'];

const FilterButtons = ({ active, onChange }) => (
    <div className="filter-buttons">
        {FILTERS.map((f) => (
            <button
                key={f}
                onClick={() => onChange(f)}
                className={`filter-btn ${active === f ? 'filter-btn--active' : ''}`}
            >
                {f}
            </button>
        ))}
    </div>
);

PropertyCard.displayName = 'PropertyCard';

const PropertyListingGrid = ({ properties = [], loader = false }) => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredProperties = activeFilter === 'All'
        ? properties
        : properties.filter((p) => p?.status === activeFilter);

    return (
        <div className="property-listing">
            <FilterButtons active={activeFilter} onChange={setActiveFilter} />

            <div className="property-grid">
                {loader ? (
                    Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                ) : filteredProperties.length > 0 ? (
                    filteredProperties.map((place, index) => (
                        <PropertyCard key={place?.id || index} place={place} />
                    ))
                ) : (
                    <h1 className="property-grid__empty">No Record Found</h1>
                )}
            </div>
        </div>
    );
};

export default PropertyListingGrid;