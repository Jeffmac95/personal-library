const express = require('express');
const app  = express();
const cors = require('cors');
const response = require('express');
const PORT = 8000;

app.use(cors());

// Hardcoded books I've read
const books = {
    'solaris': {
        'title': 'Solaris',
        'author': 'Stanislaw Lem',
        'published': '1961, 1970(english)',
        'genre': 'Science Fiction',
        'ISBN': '0156027607',
        'cover':'https://www.google.com/search?q=solaris+stanislaw+lem&rlz=1C1CHZO_enCA918CA918&sxsrf=ALiCzsb89JJAoAUWIYtEmpiCLrqg75YmFA:1654875406073&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjoxuelm6P4AhXihIkEHaucBKMQ_AUoAnoECAIQBA&biw=1920&bih=969&dpr=1#imgrc=wNKpa_TnkLwM4M'
    },
    'do androids dream of electric sheep': {
        'title': 'Do Androids Dream of Electric Sheep',
        'author': 'Philip K. Dick',
        'published': '1968',
        'genre': 'Science Fiction',
        'ISBN': '9780345404473',
        'cover': 'https://www.google.com/search?q=do+androids+dream+of+electric+sheep&tbm=isch&ved=2ahUKEwjr9eGmm6P4AhUkF1kFHeIlAsUQ2-cCegQIABAA&oq=do+andr&gs_lcp=CgNpbWcQARgAMgQIIxAnMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgYIABAeEAg6BAgAEBg6CAgAEIAEELEDOgQIABBDOgYIABAeEAVQ0QZY2BVgux5oAXAAeACAAYYBiAH9BJIBAzguMZgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=EGWjYuutBKSu5NoP4suIqAw&bih=969&biw=1920&rlz=1C1CHZO_enCA918CA918#imgrc=Xa8hMvUrBeuNXM'
    },
    'the penultimate truth': {
        'title': 'The Penultimate Truth',
        'author': 'Philip K. Dick',
        'published': '1964',
        'genre': 'Science Fiction',
        'ISBN': '9780547572475',
        'cover': 'https://www.google.com/search?q=the+penultimate+truth+pkd&tbm=isch&ved=2ahUKEwiyj8O9m6P4AhUyAWIAHVEKD6EQ2-cCegQIABAA&oq=the+penultim&gs_lcp=CgNpbWcQARgAMgQIIxAnMgQIIxAnMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6BAgAEEM6CAgAELEDEIMBOggIABCABBCxAzoHCAAQsQMQQzoLCAAQgAQQsQMQgwFQsQZYlA9g_BloAHAAeACAAaoBiAGjCZIBAzkuNJgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=P2WjYvLzMLKCiLMP0ZS8iAo&bih=969&biw=1920&rlz=1C1CHZO_enCA918CA918#imgrc=pMENXsw5EoN2JM'
    },
    'the apollo murders': {
        'title': 'The Apollo Murders',
        'author': 'Chris Hadfield',
        'published': '2021',
        'genre': 'Science Fiction',
        'ISBN': '9780735282353',
        'cover': 'https://www.google.com/search?q=the+apollo+murders&tbm=isch&ved=2ahUKEwiKyfHFm6P4AhUSMlkFHW75A_YQ2-cCegQIABAA&oq=the+apollo+murders&gs_lcp=CgNpbWcQAzIFCAAQgAQyBQgAEIAEMgQIABAYMgQIABAYMgQIABAYMgQIABAYMgQIABAYMgQIABAYMgQIABAYMgQIABAYOgQIIxAnOgQIABBDOggIABCxAxCDAToICAAQgAQQsQM6CwgAEIAEELEDEIMBUM0GWKQXYL8XaABwAHgAgAGwAYgBhAqSAQQxNy4xmAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=UWWjYsrcFJLk5NoP7vKPsA8&bih=969&biw=1920&rlz=1C1CHZO_enCA918CA918#imgrc=ay5fOCva4mL8rM'
    },
    'contact': {
        'title': 'Contact',
        'author': 'Carl Sagan',
        'published': '1985',
        'genre': 'Science Fiction',
        'ISBN': '9781501197987',
        'cover': 'https://www.google.com/search?q=contact+calr+sagan&tbm=isch&ved=2ahUKEwiQ1oHRm6P4AhUND1kFHTZABd8Q2-cCegQIABAA&oq=contact+calr+sagan&gs_lcp=CgNpbWcQAzoECCMQJzoFCAAQgAQ6BAgAEBg6CAgAELEDEIMBOggIABCABBCxAzoECAAQAzoECAAQQzoGCAAQHhAFUNIGWIQlYJsmaARwAHgAgAHkAYgB5Q2SAQYyMS4wLjKYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=aGWjYpCCKY2e5NoPtoCV-A0&bih=969&biw=1920&rlz=1C1CHZO_enCA918CA918#imgrc=GdNlJBamtzHcYM'
    },
    'childhoods end': {
        'title': 'ChildHoods End',
        'author': 'Arthur C. Clarke',
        'published': '1953',
        'genre': 'Science Fiction',
        'ISBN': '9780345444059',
        'cover': 'https://www.google.com/search?q=childhoods+end+arthur+c+clarke&tbm=isch&ved=2ahUKEwjjnIbqm6P4AhWnFFkFHW3FDDUQ2-cCegQIABAA&oq=childhoods+end+arthur+c+clarke&gs_lcp=CgNpbWcQAzIGCAAQChAYOgQIIxAnOgUIABCABDoECAAQQzoHCAAQgAQQClCTA1imHmDSHmgAcAB4AIABQ4gB0AeSAQIxNpgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=nWWjYqPaCqep5NoP7YqzqAM&bih=969&biw=1920&rlz=1C1CHZO_enCA918CA918#imgrc=XXWC_2R49ZtPaM'
    }
}

// Get root file and respond index html
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
})

// Get the API and bookname query, turn the input to lowercase
app.get('/api/:bookName', (request, response) => {
    const booksName = request.params.bookName.toLowerCase();
    // If the input is in the books object, return it as JSON. Else return Solaris
    if (books[booksName]) {
        response.json(books[booksName]);
    } else {
        response.json(books['solaris']);
    }
})

// Server running on port
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})