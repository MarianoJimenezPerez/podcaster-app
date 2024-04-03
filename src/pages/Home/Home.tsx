import Header from '@/components/Header/Header';
import PodcastsList from '@/components/PodcastsList/PodcastsList';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <PodcastsList />
      </main>
    </>
  );
};
export default Home;
