import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: "Геометрическая кружка",
      price: 2200,
      originalPrice: 2800,
      image: "/img/6ec6f922-57e6-49f6-b5e1-3d6bc9e8771c.jpg",
      category: "Дизайнерские"
    },
    {
      id: 2,
      name: "Премиум черная",
      price: 3200,
      image: "/img/e82d5b9a-9358-413d-aec0-d18bc1788dd4.jpg",
      category: "Премиум"
    },
    {
      id: 3,
      name: "Термокружка бирюзовая",
      price: 2800,
      image: "/img/ec81e275-f0e9-4f01-965f-71248ff3cd41.jpg",
      category: "Термокружки"
    }
  ];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Coffee" size={32} className="text-orange-500" />
              <h1 className="text-2xl font-bold text-gray-900">MUG STORE</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">Главная</a>
              <a href="#catalog" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">Каталог</a>
              <a href="#about" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">О нас</a>
              <a href="#delivery" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">Доставка</a>
              <a href="#contacts" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">Контакты</a>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingBag" size={20} />
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-orange-500">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {cart.length === 0 ? 'Ваша корзина пуста' : `${getTotalItems()} товара на сумму ${getTotalPrice().toLocaleString()} ₽`}
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-gray-600 text-sm">{item.price.toLocaleString()} ₽</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-6 w-6 p-0"
                          >
                            -
                          </Button>
                          <span className="text-sm font-medium">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-6 w-6 p-0"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {cart.length > 0 && (
                  <div className="mt-6">
                    <Separator className="mb-4" />
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Итого:</span>
                      <span>{getTotalPrice().toLocaleString()} ₽</span>
                    </div>
                    <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600">
                      Оформить заказ
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Уникальные кружки<br />для ваших моментов
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Премиальные дизайнерские кружки с доставкой по всей России
          </p>
          <Button size="lg" variant="secondary" className="text-orange-600 hover:bg-white">
            Смотреть каталог
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Наш каталог
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-turquoise-500 text-white">
                    {product.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <CardTitle className="mb-2 text-lg">{product.name}</CardTitle>
                  <CardDescription className="mb-4 text-gray-600">
                    Высокое качество, стильный дизайн
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {product.price.toLocaleString()} ₽
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          {product.originalPrice.toLocaleString()} ₽
                        </span>
                      )}
                    </div>
                    <Button 
                      onClick={() => addToCart(product)}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">О нас</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Мы создаем уникальные дизайнерские кружки, которые превращают каждый глоток кофе или чая 
              в особенный момент. Наша команда тщательно отбирает материалы и работает с талантливыми 
              дизайнерами, чтобы создавать изделия высочайшего качества.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Icon name="Award" size={48} className="text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Премиальное качество</h3>
                <p className="text-gray-600">Только лучшие материалы и технологии производства</p>
              </div>
              <div className="text-center">
                <Icon name="Palette" size={48} className="text-turquoise-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Уникальный дизайн</h3>
                <p className="text-gray-600">Эксклюзивные дизайны от ведущих художников</p>
              </div>
              <div className="text-center">
                <Icon name="Heart" size={48} className="text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">С любовью</h3>
                <p className="text-gray-600">Каждая кружка создается с особым вниманием к деталям</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section id="delivery" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Доставка</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <Icon name="Truck" size={48} className="text-orange-500 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Быстрая доставка</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <Icon name="Check" size={16} className="text-green-500 mr-2" />
                  По Москве — 1-2 дня
                </li>
                <li className="flex items-center">
                  <Icon name="Check" size={16} className="text-green-500 mr-2" />
                  По России — 3-7 дней
                </li>
                <li className="flex items-center">
                  <Icon name="Check" size={16} className="text-green-500 mr-2" />
                  Бесплатная доставка от 3000 ₽
                </li>
              </ul>
            </div>
            <div>
              <Icon name="Shield" size={48} className="text-turquoise-500 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Гарантии</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <Icon name="Check" size={16} className="text-green-500 mr-2" />
                  Безопасная упаковка
                </li>
                <li className="flex items-center">
                  <Icon name="Check" size={16} className="text-green-500 mr-2" />
                  Возврат в течение 14 дней
                </li>
                <li className="flex items-center">
                  <Icon name="Check" size={16} className="text-green-500 mr-2" />
                  Гарантия качества
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Контакты</h2>
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <Icon name="Phone" size={32} className="text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Телефон</h3>
                <p className="text-gray-700">+7 (495) 123-45-67</p>
              </div>
              <div className="text-center">
                <Icon name="Mail" size={32} className="text-turquoise-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-700">info@mugstore.ru</p>
              </div>
            </div>
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">Мы работаем каждый день с 9:00 до 21:00</p>
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Написать в поддержку
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Coffee" size={24} className="text-orange-500" />
            <span className="text-xl font-bold">MUG STORE</span>
          </div>
          <p className="text-gray-400">© 2024 MUG STORE. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;