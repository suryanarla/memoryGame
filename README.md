# Memory Game
The main aim of this project is to build a game that puts every human brain in thinking mode. We have to select symbols getting from font awesome icons and make them to match. Need to end the game if and only if all the cards get matched.

## I worked on following steps to complete this project.
1. I downloaded the skeleton project from rubric provided by **Udacity**.
2. And opened it in web browser by using a server provided by google (web server for chrome (**200 OK**)).
3. I identified the file structure of skeleton project given by the **Udacity**.
4. I observed the files like `app.js`,`app.css` and the root file (`index.html`).
5. I manipulated little thing in HTML file (`index.html`) such as star count, move count etc...
6. I decided all the manipulations are required in `app.js`. I did many modules in it by using event listeners.   
7. Restart option is given to the user so the user can restart the game at any point of time.
8. Added a `click` eventlistener to each array element (each card). when the event triggered, the viewCard function invokes. In `viewCard` function I added `classLists` accordingly to styling the elements. The timer also starts when clicking on any of the card for the first time and stopped all the cards gets matched with `clearInterval` function.
9. stored the card in an array after clicking on it. If the card value equals to 2 then the count of moves will be increased. And also checks for equality, If the two cards equal then color of the cards changes. Similarly if unmatched then color changes to red.
10. The timer initialized 0 minutes and 0sec initially whenever you clicked the card.
11. Rating depends on number of moves in the starCount function.
      -If the number of moves<=10 the star count is 3.
      -If the number of moves>10 and moves<=20 the star count is 2.
      -If the number of moves>20 the star count is 1.
12. If all the cards get matched, The game ended with congratulatory message. The congratulatory message includes the star rating, moves count, time to complete and a restart button.
13. If the user clicks the restart button, The game starts again with initial time and move counter.
