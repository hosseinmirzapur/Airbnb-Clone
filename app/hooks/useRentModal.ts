import { create } from "zustand"

interface RentModalStore {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

const useRentModalModal = create<RentModalStore>((set) => ({
	isOpen: false,
	onClose: () => set({ isOpen: false }),
	onOpen: () => set({ isOpen: true }),
}))

export default useRentModalModal
