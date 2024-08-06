import Card from '@/components/shared/Card';
import Hero from '@/components/shared/Hero';

const Home = () => {
    return (
        <>
            <Hero />
            <section className="py-12 bg-gray-100 sm:py-16 lg:py-20">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-md mx-auto text-center">
                        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Our featured items</h2>
                        <p className="mt-4 text-base font-normal leading-7 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus faucibus massa dignissim tempus.</p>
                    </div>
                    <Card />
                </div>
            </section>
        </>
    );
};

export default Home;