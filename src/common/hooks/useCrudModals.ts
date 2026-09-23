"use client";

import { useState } from "react";

/**
 * Estado de los modales de una pantalla de listado (crear, editar y eliminar).
 *
 * El registro seleccionado se conserva aunque el modal se cierre: así el
 * título no cambia de "Editar" a "Nuevo" mientras corre la animación de cierre.
 */
export const useCrudModals = <T>() => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<T | undefined>(undefined);
	// Cambia en cada apertura; usado como `key` fuerza a que el formulario se reinicie
	const [formKey, setFormKey] = useState(0);

	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [itemToDelete, setItemToDelete] = useState<T | undefined>(undefined);

	const openForm = (item: T | undefined) => {
		setEditingItem(item);
		setFormKey((current) => current + 1);
		setIsFormOpen(true);
	};

	return {
		isFormOpen,
		/** Registro en edición, o `undefined` si se está creando uno nuevo. */
		editingItem,
		formKey,
		openCreate: () => openForm(undefined),
		openEdit: (item: T) => openForm(item),
		setFormOpen: setIsFormOpen,

		isDeleteOpen,
		itemToDelete,
		openDelete: (item: T) => {
			setItemToDelete(item);
			setIsDeleteOpen(true);
		},
		setDeleteOpen: setIsDeleteOpen,
	};
};
