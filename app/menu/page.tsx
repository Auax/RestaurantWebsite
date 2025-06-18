import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import Image from "next/image"
import {Utensils} from "lucide-react"

const menuData = {
    entrantes: [
        {
            name: "Bruschetta al Pomodoro",
            description: "Pan tostado con tomate fresco, ajo, albahaca y aceite de oliva.",
            price: "€8.50",
            imgSrc: "/bruschetta-al-pomodoro.jpg",
        },
        {
            name: "Caprese",
            description: "Mozzarella fresca, tomates maduros, albahaca y un toque de aceite de oliva.",
            price: "€10.00",
            imgSrc: "/caprese.jpg",
        },
        {
            name: "Antipasto Misto",
            description: "Selección de embutidos italianos, quesos y verduras encurtidas.",
            price: "€15.00",
            imgSrc: "/misto.jpg",
        },
    ],
    pastas: [
        {
            name: "Spaghetti Carbonara",
            description: "La auténtica receta con guanciale, huevo, Pecorino Romano y pimienta.",
            price: "€14.50",
            imgSrc: "/pasta-carbonara.jpg",
        },
        {
            name: "Lasagna alla Bolognese",
            description: "Capas de pasta fresca con ragú de carne y bechamel, horneada a la perfección.",
            price: "€16.00",
            imgSrc: "/lasagna.jpg",
        },
        {
            name: "Ravioli di Ricotta e Spinaci",
            description: "Raviolis caseros rellenos de ricotta y espinacas con salsa de mantequilla y salvia.",
            price: "€15.50",
            imgSrc: "/ravioli.jpg",
        },
    ],
    pizzas: [
        {
            name: "Margherita",
            description: "Tomate San Marzano, mozzarella de búfala, albahaca fresca y aceite de oliva.",
            price: "€12.00",
            imgSrc: "/pizza.jpg",
        },
        {
            name: "Diavola",
            description: "Tomate, mozzarella, salami picante y guindilla.",
            price: "€13.50",
            imgSrc: "/diavola.jpg",
        },
        {
            name: "Quattro Formaggi",
            description: "Mozzarella, gorgonzola, provolone y parmesano.",
            price: "€14.00",
            imgSrc: "/Quattro-Formaggi.jpg",
        },
    ],
    postres: [
        {
            name: "Tiramisú",
            description: "Clásico postre italiano con bizcochos de soletilla, café, mascarpone y cacao.",
            price: "€7.50",
            imgSrc: "/tiramisu.jpg",
        },
        {
            name: "Panna Cotta",
            description: "Delicada crema de nata cocida con coulis de frutos rojos.",
            price: "€7.00",
            imgSrc: "/pannacotta.jpg",
        },
    ],
}

type MenuItem = {
    name: string
    description: string
    price: string
    imgSrc: string
}

function MenuCategory({title, items}: { title: string; items: MenuItem[] }) {
    return (
        <div>
            <h3 className="text-2xl font-semibold text-stone-800 mb-6 mt-8 first:mt-0">{title}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <Card key={item.name} className="overflow-hidden shadow-lg  flex flex-col">
                        <CardHeader className="p-0">
                            <Image
                                src={item.imgSrc || "/placeholder.svg"}
                                alt={item.name}
                                width={300}
                                height={200}
                                className="w-full h-48 object-cover"
                            />
                        </CardHeader>
                        <CardContent className="p-6 flex-grow">
                            <CardTitle className="text-xl font-bold text-stone-800">{item.name}</CardTitle>
                            <CardDescription
                                className="text-sm text-stone-600 mt-1 mb-2">{item.description}</CardDescription>
                        </CardContent>
                        <div className="px-6 pb-6 pt-0">
                            <p className="text-md font-bold text-red-400">{item.price}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default function MenuPage() {
    return (
        <div className="py-12 md:py-20 bg-stone-50">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-12 md:mb-16">
                    <Utensils className="h-12 w-12 mx-auto mb-4 text-red-400"/>
                    <h1 className="text-4xl sm:text-5xl font-bold text-stone-800">Nuestro Menú</h1>
                    <p className="mt-4 text-lg text-stone-700 max-w-2xl mx-auto">
                        Explora nuestra selección de auténticos platos italianos, preparados con pasión y los mejores
                        ingredientes.
                    </p>
                </header>

                <Tabs defaultValue="entrantes" className="w-full">
                    <TabsList className="grid w-full h-auto grid-cols-1 grid-rows-4 sm:grid-rows-1 sm:grid-cols-4 mb-8 bg-stone-200 p-1 rounded-lg">
                        <TabsTrigger value="entrantes"
                                     className="data-[state=active]:bg-red-400 data-[state=active]:text-white">
                            Entrantes
                        </TabsTrigger>
                        <TabsTrigger value="pastas"
                                     className="data-[state=active]:bg-red-400 data-[state=active]:text-white">
                            Pastas
                        </TabsTrigger>
                        <TabsTrigger value="pizzas"
                                     className="data-[state=active]:bg-red-400 data-[state=active]:text-white">
                            Pizzas
                        </TabsTrigger>
                        <TabsTrigger value="postres"
                                     className="data-[state=active]:bg-red-400 data-[state=active]:text-white">
                            Postres
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="entrantes">
                        <MenuCategory title="Antipasti / Entrantes" items={menuData.entrantes}/>
                    </TabsContent>
                    <TabsContent value="pastas">
                        <MenuCategory title="Primi Piatti / Pastas" items={menuData.pastas}/>
                    </TabsContent>
                    <TabsContent value="pizzas">
                        <MenuCategory title="Le Nostre Pizze / Nuestras Pizzas" items={menuData.pizzas}/>
                    </TabsContent>
                    <TabsContent value="postres">
                        <MenuCategory title="Dolci / Postres" items={menuData.postres}/>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
