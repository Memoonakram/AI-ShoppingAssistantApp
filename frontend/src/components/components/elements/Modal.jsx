import React from 'react'
import { ButtonElement } from './FormElements'

export const Modal = ({ isOpen, isClose, onSave, title, children }) => {
    if (!isOpen) return null;
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                position: "fixed",
                top: 0,
                left: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 100,
            }}
        >
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="card p-4 rounded-lg max-h-[80vh]">
                    <h2 className="text-lg font-medium mb-4">{title}</h2>
                    <div className="overflow-auto">
                        {children}
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">

                        {isClose &&
                        <ButtonElement
                            onClick={isClose}
                            label={"Cancel"}
                        />
}
                        {onSave &&
                        <ButtonElement
                            onClick={onSave}
                            primary
                            label={"Save"}
                        />
}
                    </div>
                </div></div></div>

    )
}
