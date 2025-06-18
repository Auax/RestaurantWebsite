"use client"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Mail, MapPin, Phone, Clock} from "lucide-react"
import type {FormEvent} from "react"
import {useToast} from "@/hooks/use-toast" // Assuming you have a useToast hook

export default function ContactPage() {
    const {toast} = useToast()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // Aquí iría la lógica para enviar el formulario, por ejemplo, a una API.
        // Por ahora, solo mostramos un toast.
        toast({
            title: "Mensaje Enviado",
            description: "Gracias por contactarnos. Te responderemos pronto.",
        })
        ;(event.target as HTMLFormElement).reset()
    }

    return (
        <div className="py-12 md:py-20 bg-stone-50">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-12 md:mb-16">
                    <Mail className="h-12 w-12 mx-auto mb-4 text-red-400"/>
                    <h1 className="text-4xl sm:text-5xl font-bold text-stone-800">Contáctanos</h1>
                    <p className="mt-4 text-lg text-stone-700 max-w-2xl mx-auto">
                        ¿Tienes alguna pregunta o deseas hacer una reserva? Estamos aquí para ayudarte.
                    </p>
                </header>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <Card className="p-6">
                            <CardHeader>
                                <CardTitle className="text-2xl text-stone-800">Información de Contacto</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-stone-700">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-6 w-6 text-red-400 mt-1 flex-shrink-0"/>
                                    <div>
                                        <h3 className="font-semibold">Dirección</h3>
                                        <p>Carrer de Montcada 42</p>
                                        <p>08003 Barcelona, España</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="h-6 w-6 text-red-400 mt-1 flex-shrink-0"/>
                                    <div>
                                        <h3 className="font-semibold">Teléfono</h3>
                                        <p>+34 900 123 456</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail className="h-6 w-6 text-red-400 mt-1 flex-shrink-0"/>
                                    <div>
                                        <h3 className="font-semibold">Email</h3>
                                        <p>info@dolcevitaristorante.es</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="h-6 w-6 text-red-400 mt-1 flex-shrink-0"/>
                                    <div>
                                        <h3 className="font-semibold">Horario</h3>
                                        <p>Lunes a Domingo: 12:00 PM - 11:00 PM</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Placeholder for Map */}
                        <Card className="p-6">
                            <CardHeader>
                                <CardTitle className="text-2xl text-stone-800">Encuéntranos</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div
                                    className="aspect-video bg-stone-200 rounded-md flex items-center justify-center text-stone-500">
                                    <iframe className="w-full h-full" frameBorder="0" scrolling="no"
                                            marginHeight="0" marginWidth="0"
                                            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=Carrer%20de%20Montcada%2042+(Dolce%20Vita%20Ristorante)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                                        <a href="https://www.gps.ie/car-satnav-gps/">Car Navigation Systems</a>
                                    </iframe>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <div id="reservas">
                        <Card className="p-6">
                            <CardHeader>
                                <CardTitle className="text-2xl text-stone-800">Haz tu Reserva</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <Label htmlFor="name" className="text-stone-700">
                                            Nombre Completo
                                        </Label>
                                        <Input id="name" name="name" type="text" placeholder="Tu nombre" required
                                               className="mt-1"/>
                                    </div>
                                    <div>
                                        <Label htmlFor="email" className="text-stone-700">
                                            Correo Electrónico
                                        </Label>
                                        <Input id="email" name="email" type="email" placeholder="tu@email.com" required
                                               className="mt-1"/>
                                    </div>
                                    <div>
                                        <Label htmlFor="phone" className="text-stone-700">
                                            Teléfono (Opcional)
                                        </Label>
                                        <Input id="phone" name="phone" type="tel" placeholder="Tu número de teléfono"
                                               className="mt-1"/>
                                    </div>
                                    <div>
                                        <Label htmlFor="subject" className="text-stone-700">
                                            Asunto
                                        </Label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            placeholder="Ej: Reserva para 4 personas"
                                            required
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="message" className="text-stone-700">
                                            Mensaje
                                        </Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Escribe tu mensaje o detalles de la reserva aquí..."
                                            rows={5}
                                            required
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Button type="submit"
                                                className="w-full bg-red-400 hover:bg-red-500 text-white text-sm py-3">
                                            Solicitar Reserva
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
