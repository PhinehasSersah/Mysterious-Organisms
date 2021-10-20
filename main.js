// Returns a random DNA base

const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)]
  }
  //console.log(returnRandBase());
  
  // Returns a random single stand of DNA containing 15 bases
  
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  //console.log(mockUpStrand());
  
  const pAequorFactory = (specimenNumber, dna) => {
    return {
      specimenNumber,
      dna,
      mutate() {
        const randomIndexDna = Math.floor(Math.random() * this.dna.length);
        let newDnaBase = returnRandBase();
        while (this.dna[randomIndexDna] === newDnaBase) {
          newDnaBase = returnRandBase();
        }
        this.dna[randomIndexDna] = newDnaBase;
        return this.dna;
      },
      compareDNA(otherOrg) {
        const similarities = this.dna.reduce((acc, curr, idx, arr) => {
          if (arr[idx] === otherOrg.dna[idx]) {
            return acc + 1;
          } else {
            return acc;
          }
        }, 0);
        const percentOfDNAshared = (similarities / this.dna.length) * 100;
        const percentageTo2Deci = percentOfDNAshared.toFixed(2);
        console.log(`${this.specimanNum} and ${otherOrg.specimanNum} have ${percentageTo2Deci}% DNA in common.`);
      },
      willLikelySurvive() {
        const cOrG = this.dna.filter(org => org === "C" || org === "G");
        return cOrG.length / this.dna.length >= 0.6;
      },
    }
  };
  
  const survivingSpecimen = [];
  let idCounter = 1;
  
  while (survivingSpecimen.length < 30) {
    let newOrg = pAequorFactory(idCounter, mockUpStrand());
    if (newOrg.willLikelySurvive()) {
      survivingSpecimen.push(newOrg);
    }
    idCounter++;
  }
  
  console.log(survivingSpecimen);