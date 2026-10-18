import Image from 'next/image';

import { Reveal } from './Reveal';
import styles from './About.module.css';

const FACTS = [
  { value: '2019', text: 'обжариваем с этого года' },
  { value: '5 кг', text: 'одна партия — небольшая, чтобы не залёживалась' },
  { value: '1–3', text: 'день после обжарки — зерно уже у вас' },
];

export function About() {
  return (
    <section id="my" className={`section ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.text}>
          <span className="eyebrow">Кто обжаривает</span>
          <h2>
            Аня <em>и</em> Дмитрий
          </h2>
          <p className="lead">
            Раньше мы работали бариста и каждый день видели, как одно и то же зерно звучит по-разному — смотря
            когда его обжарили. В 2019 году начали обжаривать сами: понемногу, чтобы всё успевали выпить свежим.
          </p>
        </Reveal>

        <Reveal className={styles.media}>
          <Image
            src="/images/pourover.jpg"
            alt="Кофе заваривается в воронке на кухонном столе"
            fill
            sizes="(min-width: 900px) 40vw, 100vw"
            className={styles.photo}
          />
        </Reveal>

        <ul className={styles.facts}>
          {FACTS.map((fact) => (
            <li key={fact.value}>
              <span className={styles.value}>{fact.value}</span>
              <span>{fact.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
