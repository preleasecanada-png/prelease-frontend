'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEllipsisV, faRedo, faMagnifyingGlassPlus, faMagnifyingGlassMinus, faSun, faAdjust, faUndo } from '@fortawesome/free-solid-svg-icons';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableImage = ({ id, img, index, onSetCover, onDelete, onEdit }) => {
    const dropdownRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        position: 'relative',
        marginRight: '10px',
        cursor: 'grab',
    };

    // Apply image edit styles if they exist
    const imageStyle = img.editParams ? {
        filter: `brightness(${img.editParams.brightness}%) contrast(${img.editParams.contrast}%)`,
        transform: `rotate(${img.editParams.rotation}deg) scale(${img.editParams.zoom / 100})`,
    } : {};

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDropdownOpen(false);
        onDelete(id);
    };

    const handleSetCover = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDropdownOpen(false);
        onSetCover(id);
    };

    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDropdownOpen(false);
        onEdit(id);
    };

    const toggleDropdown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={index === 0 ? 'pro-full-width-image' : 'pro-small-image'}>
            <div
                className={`${index != 0 ? 'memu-icon-f' : 'pro-cover-icon'}`}
                ref={dropdownRef}
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onClick={toggleDropdown}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
            >
                <FontAwesomeIcon
                    icon={faEllipsisV}
                    style={{ color: '#000', cursor: 'pointer' }}
                />
                {isDropdownOpen && (
                    <div
                        className="custom-dropdown-menu"
                        style={{
                            position: 'absolute',
                            top: '35px',
                            right: '0',
                            backgroundColor: 'white',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                            borderRadius: '4px',
                            padding: '5px 0',
                            minWidth: '150px',
                            zIndex: 1000
                        }}
                    >
                        <div
                            className="dropdown-item"
                            style={{ padding: '8px 15px', cursor: 'pointer' }}
                            onClick={handleSetCover}
                        >
                            Set as cover
                        </div>
                        <div
                            className="dropdown-item text-danger"
                            style={{ padding: '8px 15px', cursor: 'pointer', color: '#dc3545' }}
                            onClick={handleDelete}
                        >
                            Delete
                        </div>

                        <div
                            className="dropdown-item"
                            style={{ padding: '8px 15px', cursor: 'pointer', color: '#0d6efd' }}
                            onClick={handleEdit}
                        >
                            Edit
                        </div>
                    </div>
                )}
            </div>

            {index === 0 && <div className="pro-cover">Cover</div>}
            <div className={index === 0 ? 'pro-full-width-image' : 'pro-small-image'} style={{ overflow: 'hidden', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img
                    src={img.preview}
                    className="properties-after-upload"
                    alt={`Uploaded ${index}`}
                    style={imageStyle}
                />
            </div>
        </div>
    );
};

const PhotoHouse = ({ uploadedImages, setUploadedImages }) => {
    const [show, setShow] = useState(false);
    const [modalImages, setModalImages] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentEditImage, setCurrentEditImage] = useState(null);
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [zoom, setZoom] = useState(100);
    const [rotation, setRotation] = useState(0);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const onDrop = useCallback((acceptedFiles) => {
        const filesWithPreview = acceptedFiles.map((file) => ({
            id: URL.createObjectURL(file),
            file,
            preview: URL.createObjectURL(file),
        }));
        setModalImages((prev) => [...prev, ...filesWithPreview]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: true,
    });

    const handleUploadImages = () => {
        setUploadedImages((prev) => [...prev, ...modalImages]);
        setModalImages([]);
        setShow(false);
    };

    const handleDeleteModalImage = (index) => {
        setModalImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleDeleteUploadedImage = (imageId) => {
        setUploadedImages((prev) => prev.filter((img) => img.id !== imageId));
    };

    const handleSetImageAsCover = (imageId) => {
        const imageIndex = uploadedImages.findIndex((img) => img.id === imageId);
        if (imageIndex > 0) {
            const newImages = [...uploadedImages];
            const [movedImage] = newImages.splice(imageIndex, 1);
            newImages.unshift(movedImage);
            setUploadedImages(newImages);
        }
    };

    const handleEditImage = (imageId) => {
        const imageToEdit = uploadedImages.find(img => img.id === imageId);
        if (imageToEdit) {
            setCurrentEditImage(imageToEdit);
            if (imageToEdit.editParams) {
                setBrightness(imageToEdit.editParams.brightness);
                setContrast(imageToEdit.editParams.contrast);
                setZoom(imageToEdit.editParams.zoom);
                setRotation(imageToEdit.editParams.rotation);
            } else {
                setBrightness(100);
                setContrast(100);
                setZoom(100);
                setRotation(0);
            }
            setShowEditModal(true);
        }
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setCurrentEditImage(null);
    };

    const handleSaveEditedImage = () => {
        setUploadedImages(prevImages =>
            prevImages.map(img =>
                img.id === currentEditImage.id
                    ? {
                        ...img,
                        editedAt: new Date().toISOString(),
                        editParams: { brightness, contrast, zoom, rotation }
                    }
                    : img
            )
        );

        setShowEditModal(false);
        setCurrentEditImage(null);
    };

    const handleClose = () => setShow(false);

    const handleDragEndUploaded = (event) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = uploadedImages.findIndex(img => img.id === active.id);
            const newIndex = uploadedImages.findIndex(img => img.id === over.id);
            setUploadedImages((items) => arrayMove(items, oldIndex, newIndex));
        }
    };

    const resetEdits = () => {
        setBrightness(100);
        setContrast(100);
        setZoom(100);
        setRotation(0);
    };
    const getEditedImageStyle = () => {
        return {
            maxWidth: '100%',
            maxHeight: '400px',
            objectFit: 'contain',
            borderRadius: '8px',
            filter: `brightness(${brightness}%) contrast(${contrast}%)`,
            transform: `rotate(${rotation}deg) scale(${zoom / 100})`,
            transition: 'transform 0.3s, filter 0.3s'
        };
    };

    return (
        <>
            <div className='photo-house-main mb-4'>
                <h1>Add some photos of your house</h1>
                <p className="ab-place-hea-para">You'll need 5 photos to get started. You can add more or make changes later.</p>

                {uploadedImages.length > 0 ? (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndUploaded}>
                        <SortableContext items={uploadedImages.map(img => img.id)} strategy={horizontalListSortingStrategy}>
                            <div className='properties-after-upload-main' style={{ display: 'flex', gap: '10px' }}>
                                {uploadedImages.map((img, index) => (
                                    <SortableImage
                                        key={img.id}
                                        id={img.id}
                                        img={img}
                                        index={index}
                                        onDelete={handleDeleteUploadedImage}
                                        onSetCover={handleSetImageAsCover}
                                        onEdit={handleEditImage}
                                    />
                                ))}
                                <div className='properties-after-upload'>
                                    <button className='btn-add-more-picture photo-upload-btn' data-bs-toggle="modal" data-bs-target="#exampleModal">+ Add more</button>
                                </div>
                            </div>
                        </SortableContext>
                    </DndContext>
                ) : (
                    <div className='house-photos'>
                        <div className='bg-photo'></div>
                        {/* <button className='add-photo' onClick={() => setShow(true)}>Add Photos</button> */}

                        <button className='add-photo' data-bs-toggle="modal" data-bs-target="#exampleModal">Add Photos</button>
                    </div>
                )}
            </div>
            {/* {show && (
                <>
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1040,
                    }}></div>
                    <div className="modal" style={{ display: 'block', zIndex: 1050 }}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content border-1-5">
                                <div className="modal-body">
                                    <div className='upload-photo-hea-main'>
                                        <button type="button" className="btn-close" onClick={handleClose}></button>
                                        <div className='upload-photo-hea'>
                                            <h1>Upload Photos</h1>
                                            <p>{modalImages.length > 0 ? `${modalImages.length} item(s) selected` : "No items selected"}</p>
                                        </div>
                                    </div>
                                    {modalImages.length > 0 ? (
                                        <div className='properties-photo'>
                                            {modalImages.map((img, index) => (
                                                <div className='image-wrapper' key={index} style={{ position: 'relative' }}>
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                        className='trash-icon'
                                                        onClick={() => handleDeleteModalImage(index)}
                                                        style={{
                                                            position: 'absolute',
                                                            top: 10,
                                                            right: 10,
                                                            color: '#fff',
                                                            backgroundColor: 'rgba(0,0,0,0.6)',
                                                            padding: '5px',
                                                            borderRadius: '50%',
                                                            cursor: 'pointer',
                                                            zIndex: 2
                                                        }}
                                                    />
                                                    <img
                                                        src={img.preview}
                                                        alt={`upload-${index}`}
                                                        style={{
                                                            height: 280,
                                                            width: 280,
                                                            borderRadius: 8,
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className='drag-and-drop' {...getRootProps()}>
                                            <img src="/images/propertity/step2/stand-out-place.webp" alt="" />
                                            <h3>Drag and drop</h3>
                                            <p>or browse for photos</p>
                                            <input {...getInputProps()} />
                                            <button type="button">Browse</button>
                                        </div>
                                    )}

                                    <div className='modal-footer upload-photo-btns'>
                                        {modalImages.length > 0
                                            ? <div className='upload-photo-done' onClick={() => setModalImages([])}>Cancel</div>
                                            : <div className='upload-photo-done' onClick={handleClose}>Done</div>
                                        }
                                        <button className='photo-upload-btn' onClick={handleUploadImages}>
                                            Upload
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )} */}





            <div className="modal fade" show={show} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className='upload-photo-hea-main'>
                                <div className='upload-photo-hea'>
                                    <h1>Upload Photos</h1>
                                    <p>{modalImages.length > 0 ? `${modalImages.length} item(s) selected` : "No items selected"}</p>
                                </div>
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {/* <div className="modal-body"> */}
                        <div className="modal-content rounded-5">
                            <div className="modal-body add-image-modal-body-scroll-f">
                                {modalImages.length > 0 ? (
                                    <div className='properties-photo'>
                                        {modalImages.map((img, index) => (
                                            <div className='image-wrapper' key={index} style={{ position: 'relative' }}>
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    className='trash-icon'
                                                    onClick={() => handleDeleteModalImage(index)}
                                                    style={{
                                                        position: 'absolute',
                                                        top: 10,
                                                        right: 10,
                                                        color: '#fff',
                                                        backgroundColor: 'rgba(0,0,0,0.6)',
                                                        padding: '5px',
                                                        borderRadius: '50%',
                                                        cursor: 'pointer',
                                                        zIndex: 2
                                                    }}
                                                />
                                                <img
                                                    src={img.preview}
                                                    alt={`upload-${index}`}
                                                    style={{
                                                        height: "18vw",
                                                        width: "18vw",
                                                        borderRadius: 8,
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='drag-and-drop' {...getRootProps()}>
                                        <img src="/images/propertity/step2/stand-out-place.webp" alt="" />
                                        <h3>Drag and drop</h3>
                                        <p>or browse for photos</p>
                                        <input {...getInputProps()} />
                                        <button type="button">Browse</button>
                                    </div>
                                )}

                                <div className='modal-footer upload-photo-btns'>
                                    {modalImages.length > 0
                                        ? <div className='upload-photo-done' onClick={() => setModalImages([])}>Cancel</div>
                                        : <div className='upload-photo-done' onClick={handleClose}>Done</div>
                                    }
                                    <button className='photo-upload-btn' onClick={handleUploadImages} data-bs-dismiss="modal" aria-label="Close">
                                        Upload
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>

            {showEditModal && currentEditImage && (
                <>
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1040,
                    }}></div>
                    <div className="modal" style={{ display: 'block', zIndex: 1050 }}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content rounded-5">
                                <div className="modal-body">
                                    <div className='upload-photo-hea-main'>
                                        <button type="button" className="btn-close" onClick={handleCloseEditModal}></button>
                                        <div className='upload-photo-hea'>
                                            <h1>Edit Photo</h1>
                                        </div>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        padding: '20px',
                                        overflow: 'hidden',
                                        height: '400px',
                                        alignItems: 'center'
                                    }}>
                                        <img
                                            src={currentEditImage.preview}
                                            alt="Edit image"
                                            style={getEditedImageStyle()}
                                        />
                                    </div>
                                    <div style={{ padding: '0 20px 20px' }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            marginBottom: '20px',
                                            gap: '15px'
                                        }}>
                                            <button
                                                className="btn btn-outline-secondary"
                                                onClick={() => setRotation(rotation - 90)}
                                                style={{ padding: '8px 15px' }}
                                            >
                                                <FontAwesomeIcon icon={faUndo} style={{ marginRight: '5px' }} />
                                                Rotate Left
                                            </button>
                                            <button
                                                className="btn btn-outline-secondary"
                                                onClick={() => setRotation(rotation + 90)}
                                                style={{ padding: '8px 15px' }}
                                            >
                                                <FontAwesomeIcon icon={faRedo} style={{ marginRight: '5px' }} />
                                                Rotate Right
                                            </button>
                                            <button
                                                className="btn btn-outline-secondary"
                                                onClick={resetEdits}
                                                style={{ padding: '8px 15px' }}
                                            >
                                                Reset
                                            </button>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                            <div>
                                                <label className="form-label d-flex align-items-center">
                                                    <FontAwesomeIcon icon={faSun} style={{ marginRight: '10px' }} />
                                                    Brightness: {brightness}%
                                                </label>
                                                <input
                                                    type="range"
                                                    className="form-range"
                                                    min="0"
                                                    max="200"
                                                    value={brightness}
                                                    onChange={(e) => setBrightness(parseInt(e.target.value))}
                                                />
                                            </div>

                                            <div>
                                                <label className="form-label d-flex align-items-center">
                                                    <FontAwesomeIcon icon={faAdjust} style={{ marginRight: '10px' }} />
                                                    Contrast: {contrast}%
                                                </label>
                                                <input
                                                    type="range"
                                                    className="form-range"
                                                    min="0"
                                                    max="200"
                                                    value={contrast}
                                                    onChange={(e) => setContrast(parseInt(e.target.value))}
                                                />
                                            </div>
                                            <div>
                                                <label className="form-label d-flex align-items-center">
                                                    <FontAwesomeIcon icon={faMagnifyingGlassPlus} style={{ marginRight: '10px' }} />
                                                    Zoom: {zoom}%
                                                </label>
                                                <input
                                                    type="range"
                                                    className="form-range"
                                                    min="50"
                                                    max="200"
                                                    value={zoom}
                                                    onChange={(e) => setZoom(parseInt(e.target.value))}
                                                />
                                            </div>
                                            <div>
                                                <label className="form-label d-flex align-items-center">
                                                    <FontAwesomeIcon icon={faRedo} style={{ marginRight: '10px' }} />
                                                    Rotation: {rotation}°
                                                </label>
                                                <input
                                                    type="range"
                                                    className="form-range"
                                                    min="0"
                                                    max="359"
                                                    value={rotation}
                                                    onChange={(e) => setRotation(parseInt(e.target.value))}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='modal-footer upload-photo-btns'>
                                        <div className='upload-photo-done' onClick={handleCloseEditModal}>Cancel</div>
                                        <button className='photo-upload-btn' onClick={handleSaveEditedImage}>
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default PhotoHouse;