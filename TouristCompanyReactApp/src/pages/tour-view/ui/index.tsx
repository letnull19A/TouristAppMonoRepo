import { hotelApi, hotelTourApi, tourApi } from '@api'
import { THotel, THotelTour, TTour } from '@entities'
import { TourInfo, TourPrices } from '@features'
import { AdminPageTitle } from '@widgets'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { OrderPage } from '@pages'
import { SearchContext } from '@contexts'
import { CardGrid } from './../../search/ui/CardGrid'

const getRandom = async (): Promise<Array<TTour>> => {
	const response = await fetch(
		`${import.meta.env.VITE_API_URI}/api/tour/random/4`,
		{
			method: 'GET'
		}
	)

	const data = await response.json()
	return data
}

export const TourView = () => {
	const [currentTour, setCurrentTour] = useState<TTour>()
	const [currentHotel, setCurrentHotel] = useState<THotel>()
	const [, setCurrentHotelTour] = useState<THotelTour>()
	const [visible, setVisible] = useState<boolean>(false)
	const [succesDialogue, setSuccesDialogue] = useState<boolean>(false)
	const [tours, setTours] = useState<Array<TTour>>()

	const { id } = useParams()

	const navigate = useNavigate()

	useEffect(() => {
		if (id === undefined) return

		tourApi.getById(id).then((res) => {
			setCurrentTour(res)

			hotelTourApi.getAll(id).then((resq) => {
				setCurrentHotelTour(resq[0])

				hotelApi.getById(resq[0].hotelId).then(setCurrentHotel)
			})
		})

		getRandom().then(setTours)
	}, [id])

	return (
		<>
			<AdminPageTitle title="Обозреватель тура" toMain />
			<Dialog
				header="Оставить заявку"
				visible={visible}
				style={{ width: '30vw' }}
				draggable={false}
				onHide={() => {
					setVisible(false)
				}}
			>
				<OrderPage
					onMarked={() => {
						setVisible(false)
						setSuccesDialogue(true)
					}}
				/>
			</Dialog>
			<Dialog
				header="Успех! Заявка на рассмотрении"
				visible={succesDialogue}
				style={{ width: '30vw' }}
				draggable={false}
				onHide={() => {
					setSuccesDialogue(false)
				}}
			>
				<div className="flex flex-column">
					<img
						style={{ display: 'block', margin: '0 auto' }}
						src="/icons8-success-240.svg"
					/>
					<Button
						onClick={() => navigate('/order-list')}
						link
						className="mt-4"
						label="Перейти к заявкам"
					/>
				</div>
			</Dialog>
			<div className="grid mt-5 flex flex-column md:flex-row">
				<div className="col-12 md:col-7">
					<img
						className="w-full"
						src={`${import.meta.env.VITE_API_URI}/bucket/${
							currentTour?.imageUrl
						}`}
						style={{ objectFit: 'contain' }}
					/>
				</div>
				<div className="col-12 md:col-5 flex flex-column gap-3">
					{id && <TourInfo tourId={id} />}
					{id && <TourPrices tourId={id} />}
					<Button
						className="w-full"
						label="Оставить заявку"
						onClick={() => setVisible(true)}
					/>
				</div>
			</div>
			<p className="text-2xl">Дополнительная информация</p>
			<div className="grid">
				<Accordion activeIndex={0} className="col-12">
					<AccordionTab header="О туре">
						<p className="m-0">{currentTour?.description}</p>
					</AccordionTab>
					<AccordionTab header="О гостинице">
						<p className="m-0">{currentHotel?.description}</p>
					</AccordionTab>
				</Accordion>
			</div>
			<p className="text-2xl">Смотрите ещё</p>
			{tours !== undefined && (
				<SearchContext.Provider value={{ data: tours, setData: setTours }}>
					<CardGrid />
				</SearchContext.Provider>
			)}
		</>
	)
}
