import React, { useState, useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

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
export default SortableImage;
