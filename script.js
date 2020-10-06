let kickstarterURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json'

let moneyData

let canvas = d3.select('#canvas')
let tooltip = d3.select('#tooltip')

let drawTreeMap = () => {
  let hierarchy = d3.hierarchy(moneyData, (node) => {
    return node['children']
  }).sum((node) => {
    return node['value']
  }).sort((node1, node2) => {
    return node2['value'] - node1['value']
  })

  let createTreeMap = d3.treemap()
    .size([1000, 600])
  createTreeMap(hierarchy)
  let moneyTiles = hierarchy.leaves()
  console.log(moneyTiles)

  let block = canvas.selectAll('g')
    .data(moneyTiles)
    .enter()
    .append('g')
    .attr('transform', (Kickstarter) => {
      return 'translate(' + Kickstarter['x0'] + ', ' + Kickstarter['y0'] + ')'
    })

  block.append('rect')
    .attr('class', 'tile')
    .attr('fill', (Kickstarter) => {
      let category = Kickstarter['data']['category']
      if (category === 'Product Design') {
        return '#ab78f1';
      } else if (category === 'Tabletop Games') {
        return '#43f285'
      } else if (category === 'Gaming Hardware') {
        return '#5aa6e3'
      } else if (category === 'Video Games') {
        return '#9ac8ed'
      } else if (category === 'Sound') {
        return '#e1fb43'
      } else if (category === 'Television') {
        return '#784a02'
      } else if (category === 'Narrative Film') {
        return '#794a04'
      } else if (category === 'Web') {
        return '#ed93ca'
      } else if (category === 'Hardware') {
        return '#01d5cd'
      } else if (category === 'Games') {
        return '#7471f4'
      } else if (category === '3D Printing') {
        return '#dfb0f0'
      } else if (category === 'Technology') {
        return '#f60c0c'
      } else if (category === 'Wearables') {
        return '#8acca3'
      } else if (category === 'Sculpture') {
        return '#794a04'
      } else if (category === 'Apparel') {
        return '#f243e6'
      } else if (category === 'Food') {
        return '#025923'
      } else if (category === 'Art') {
        return '#794a04'
      } else if (category === 'Gadgets') {
        return '#4c5bbe'
      } else if (category === 'Drinks') {
        return '#0f863c'
      }
    })
    .attr('data-name', (Kickstarter) => {
      return Kickstarter['data']['name'];
    })
    .attr('data-category', (Kickstarter) => {
      return Kickstarter['data']['category']
    })
    .attr('data-value', (Kickstarter) => {
      return Kickstarter['data']['value']
    })
    .attr('width', (Kickstarter) => {
      return Kickstarter['x1'] - Kickstarter['x0']
    })
    .attr('height', (Kickstarter) => {
      return Kickstarter['y1'] - Kickstarter['y0']
    })
    .on('mouseover', (Kickstarter) => {
      tooltip.transition()
        .style('visibility', 'visible')

      let revenue = Kickstarter['data']['value'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

      tooltip.html(
        '$ ' + revenue + '<hr />' + Kickstarter['data']['name']
      )
      tooltip.attr('data-value', Kickstarter['data']['value'])
    })
    .on('mouseout', (Kickstarter) => {
      tooltip.transition()
        .style('visibility', 'hidden')
    })

  block.append('text').text((Kickstarter) => {
      return Kickstarter['data']['name']
    })
    .attr('x', 5)
    .attr('y', '20')
}


d3.json(kickstarterURL).then((data, err) => {
  if (err) {
    console.log(err)
  } else {
    moneyData = data
    console.log(moneyData)
    drawTreeMap()
  }
})