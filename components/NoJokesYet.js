
export default function NoJokesYet({ name }) {
  return (
    <div className="no-jokes-yet">
      <h2 className="section-title">No Jokes Yet</h2>
      <p className="section-subtitle">
        We haven’t added jokes to <strong>{name}</strong> yet — check back soon!
      </p>
    </div>
  );
}
