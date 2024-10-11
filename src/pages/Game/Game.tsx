import Card from '../../components/card/Card';

export const Game = () => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((el) => (
        <Card key={el} />
      ))}
    </div>
  );
};
