/*const sectionB = document.createElement("section")
function addBordingCountry(code){
    fetch(`https://restcountries.com/v3.1/alpha/${code}`).then(response=>response.json).then(data =>{sectionB.innerHTML +=data[0].name.common;})
 
}



async function fetchCountryData() {
    const countryInput = document.getElementById('countryInput').value;
    
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryInput}`);
        const data = await response.json();
        
        const country = data[0];
        
        const countryInfo = `
            <h2>${country.name.common}</h2>
            <p>Capital: ${country.capital}</p>
            <p>Population: ${country.population}</p>
            <p>Region: ${country.region}</p>
            <img src="${country.flags.png}" alt="${country.name.common} flag">
        `;
        const sectionA = document.createElement("section");
        //document.body.innerHTML += countryInfo;
        
        const borderingCountries = country.borders;
        borderingCountries.forEach(Element =>{
            addBordingCountry(Element);
        });
        sectionA.innerHTML +=countryInfo;
        document.body.appendChild(sectionA);
        sectionB.innerHTML=""
      
        
    } catch (error) {
        alert('Error fetching data. Please try again.');
    }
}
*/




const sectionCountryInfo = document.createElement("section");
const sectionBorderingCountries = document.createElement("section");

function addBorderingCountry(code) {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
        .then(response => response.json())
        .then(data => {
            const borderingCountryItem = document.createElement('li');
            borderingCountryItem.style.fontSize = "1rem"; // Set font size to match text
            borderingCountryItem.style.marginBottom = "5px"; // Add margin between countries
            const countryName = document.createTextNode(data[0].name.common);
            const countryFlag = document.createElement('img');
            countryFlag.src = data[0].flags.png;
            countryFlag.alt = `${data[0].name.common} flag`;
            countryFlag.style.verticalAlign = "middle"; // Align flag vertically with text
            countryFlag.style.width = "1em"; // Set width of flag to match text size
            countryFlag.style.height = "1em"; // Set height of flag to match text size
            borderingCountryItem.appendChild(countryName);
            borderingCountryItem.appendChild(document.createTextNode(" ")); // Add space between name and flag
            borderingCountryItem.appendChild(countryFlag);
            sectionBorderingCountries.querySelector('ul').appendChild(borderingCountryItem);
        })
        .catch(error => console.error('Error fetching bordering country:', error));
}

async function fetchCountryData() {
    const countryInput = document.getElementById('countryInput').value;
    
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryInput}`);
        const data = await response.json();
        
        const country = data[0];
        
        const countryInfo = document.createElement('section');
        const countryTitle = document.createElement('h2');
        countryTitle.textContent = country.name.common;
        const countryCapital = document.createElement('p');
        countryCapital.textContent = `Capital: ${country.capital}`;
        const countryPopulation = document.createElement('p');
        countryPopulation.textContent = `Population: ${country.population}`;
        const countryRegion = document.createElement('p');
        countryRegion.textContent = `Region: ${country.region}`;
        const countryFlag = document.createElement('img');
        countryFlag.src = country.flags.png;
        countryFlag.alt = `${country.name.common} flag`;
        
        countryInfo.appendChild(countryTitle);
        countryInfo.appendChild(countryCapital);
        countryInfo.appendChild(countryPopulation);
        countryInfo.appendChild(countryRegion);
        countryInfo.appendChild(countryFlag);
        
        sectionCountryInfo.appendChild(countryInfo);

        const borderingCountries = country.borders;
        const borderingCountriesList = document.createElement('ul');
        borderingCountriesList.style.listStyleType = "none"; // Remove bullet points from the list
        borderingCountries.forEach(code => {
            addBorderingCountry(code);
        });

        const borderingCountriesTitle = document.createElement('h2');
        borderingCountriesTitle.textContent = "Bordering Countries";
        sectionBorderingCountries.appendChild(borderingCountriesTitle);
        sectionBorderingCountries.appendChild(borderingCountriesList);

        sectionBorderingCountries.style.float = "right"; // Push to right side
        sectionBorderingCountries.style.marginLeft = "20px"; // Add some margin
        sectionBorderingCountries.style.verticalAlign = "top"; // Align with top of country info section
        sectionBorderingCountries.style.width = "30%"; // Set width
        sectionCountryInfo.style.width = "60%"; // Set width
        sectionCountryInfo.style.display = "inline-block"; // Make the two sections display inline
        
        document.body.appendChild(sectionCountryInfo);
        document.body.appendChild(sectionBorderingCountries);
      
    } catch (error) {
        alert('Error fetching data. Please try again.');
    }
}
