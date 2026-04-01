import React, { useState } from 'react'

const HouseDetail = ({title,setTitle,description,setDescription}) => {
    const handleTitleChange = (e) => {
        e.preventDefault();
        let text = e.target.value;
        if (text.length <= 32) {
            setTitle(text);
            return;
        }
    }
    const handleDescriptionChange = (e) => {
        e.preventDefault();
        let text = e.target.value;
        if (text.length <= 500) {
            setDescription(text);
            return;
        }
    }
    return (
        <>
            <div className='house-detail-main'>
                <h1 className='house-detail-hea'>Now, let’s give your house a title and description </h1>
                <p className="ab-place-hea-para">Short title work best. You can always change it later.</p>
                <div>
                    <div className="mb-5">
                        <label htmlFor="title" className="form-label tx-input-label">Title</label>
                        <textarea name="title" id="title" rows="2" value={title} onChange={handleTitleChange} className='form-control propertity-textarea'></textarea>
                        <span className='text-limit'>{title.length} / 32</span>
                    </div>
                </div>
                <div>
                    <div className="mb-5">
                        <label htmlFor="description" className="form-label tx-input-label">Description</label>
                        <textarea name="description" id="description" rows="6" onChange={handleDescriptionChange} value={description} className='form-control propertity-textarea'></textarea>
                        <span className='text-limit'>{description.length} / 500</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HouseDetail
