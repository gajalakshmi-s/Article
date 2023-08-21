
  function init(){ 
  
	page = 1; 
	contentContainer = document.getElementById('mainContainer')

    function fetchArticleData() {
	
	 if(page <= 3){
      fetch(`https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${page}`)
        .then(response => response.json())
        .then(data => {
          data.nodes.forEach(item => {
		  const inputTime = new Date(item.node.last_update); 
		  const formattedTime = formatDateToCustomFormat(inputTime);
		
            const newItem = document.createElement('div');
			newItem.setAttribute('class','article_Container')
			var samp = "<div class='article_items'>"
  				  +"<img title='"+item.node.author_name+"' src="+item.node.field_photo_image_section +">"
				  +"</div>"
				  +"<div class='article_items'>"
                  +"<h2>"+item.node.title+"</h2>"
				  +"<span class='updateDate'>"+formattedTime+ " IST</time>"
                  +"</div>";
			newItem.innerHTML = samp ;
            contentContainer.appendChild(newItem);
          });
		
		  page++;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
		}
    }

    function handleScroll() {
      const distanceToBottom = contentContainer.getBoundingClientRect().bottom - window.innerHeight;
      if (distanceToBottom <= 30) {
        fetchArticleData();
      }
    }
	
	function formatDateToCustomFormat(dateTimeString) {
			const options = {
				year: 'numeric',
				month: 'short',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				hour12: true,
				
			};
				const formattedDate = new Date(dateTimeString).toLocaleDateString('en-US', options);
				return formattedDate;
	}

    window.addEventListener('scroll', handleScroll);

    fetchArticleData()
	}