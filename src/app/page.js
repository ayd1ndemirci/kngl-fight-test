"use client";
import { useState, useEffect } from 'react';
import participants from '../../public/data/fighter.json';
import styles from '../styles/Home.module.css';

const Tournament = () => {
  const [round, setRound] = useState(1);
  const [currentParticipants, setCurrentParticipants] = useState(participants);
  const [selected, setSelected] = useState(null);
  const [matchup, setMatchup] = useState([]);

  const initializeMatchup = () => {
    const currentRoundParticipants = currentParticipants.slice(0, 2);
    setMatchup(currentRoundParticipants);
  };

  const advanceRound = () => {
    if (matchup.length > 0 && selected) {
      const winner = selected;
      const nextRoundParticipants = [
        ...currentParticipants.filter(p => p.id !== matchup[0].id && p.id !== matchup[1].id),
        winner
      ];
      setCurrentParticipants(nextRoundParticipants);
      setSelected(null);
      setRound(round + 1);
      initializeMatchup();
    }
  };

  const handleSelect = (participant) => {
    setSelected(participant);
  };

  useEffect(() => {
    if (currentParticipants.length > 1) {
      initializeMatchup();
    }
  }, [currentParticipants, round]);

  const totalRounds =participants.length / 2;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Round ({round}/{(totalRounds*2 + 1)})</h2>
        </div>
        <div className={styles.cardBody}>
          {matchup.length === 2 ? (
            <div className={styles.matchupContainer}>
              <div
                className={`${styles.participantCard} ${selected === matchup[0] ? styles.selected : ''}`}
                onClick={() => handleSelect(matchup[0])}
              >
                <div className={styles.participantImage} style={{ backgroundImage: `url(${matchup[0]?.fotoPath})` }}></div>
                <div className={styles.participantName}>{matchup[0]?.name}</div>
              </div>
              <div
                className={`${styles.participantCard} ${selected === matchup[1] ? styles.selected : ''}`}
                onClick={() => handleSelect(matchup[1])}
              >
                <div className={styles.participantImage} style={{ backgroundImage: `url(${matchup[1]?.fotoPath})` }}></div>
                <div className={styles.participantName}>{matchup[1]?.name}</div>
              </div>
            </div>
          ) : (
            <div className={styles.winnerAnnounce}>
              <h2>KAZANAN</h2>
              <div className={styles.winnerCard}>
                {currentParticipants.length === 1 && (
                  <>
                    <div className={styles.winnerImage} style={{ backgroundImage: `url(${currentParticipants[0]?.fotoPath})` }}></div>
                    <div className={styles.winnerName}>{currentParticipants[0]?.name}</div>
                    <div className={styles.winnerDetails}>SİKTİ ATTI!</div>
                  </>
                )}
              </div>
            </div>
          )}
          {matchup.length === 2 && (
            <button onClick={advanceRound} className={styles.advanceButton}>Seç</button>
          )}
        </div>
      </div>
      <div className={styles.footer}>
        <h4>Made by <a href="https://github.com/seri4lize" target='_blank'>seri4lize</a> & <a href='https://github.com/ayd1ndemirci' target='_blank'>ayd1ndemirci</a></h4>
      </div>
    </div>
  );
};

export default function Home() {
  return <Tournament />;
}
