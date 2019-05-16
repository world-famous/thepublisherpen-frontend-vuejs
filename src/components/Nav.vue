<template>
	<div class="data-world" :class="!user?'data-world-unsigned':''">
		<div class="data-hot">
			<ul>
				<li class="dropdown">
					<a class="dropdown-toggle" href="#" id="dd-trends" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="far" :class="{'fa-fire':trend=='hot', 'fa-chart-line':trend=='new', 'fa-bolt':trend=='controversial'}"></i>{{trend.substring(0,3)}}</a>
					<div class="dropdown-menu" aria-labelledby="dd-trends">
						<a class="dropdown-item" href="#" @click="onClickTrend('hot')" :class="{'active': trend==='hot'}"><i class="fal fa-fire"></i>hot</a>
						<a class="dropdown-item" href="#" @click="onClickTrend('new')" :class="{'active': trend==='new'}"><i class="fal fa-chart-line"></i>new</a>
						<a class="dropdown-item" href="#" @click="onClickTrend('controversial')" :class="{'active': trend==='controversial'}"><i class="fal fa-bolt"></i>controversial</a>
					</div>
				</li>
				<li class="dropdown">
					<a class="dropdown-toggle" href="#" id="dd-countries" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="far fa-map-marker-alt"></i>{{selCountry?selCountry:'Location'}} </a>
					<div class="dropdown-menu" aria-labelledby="dd-countries" id="countryDropDown">
						<input type="text" placeholder="Search.." id="myInput" class="dropdown-item search-country" v-on:keyup="filterFunction">
						<a class="dropdown-item"  href="#" v-for="c in countries" :key="c.code" @click="onClickCountry(c.code, c.name)">{{c.name}}</a>
					</div>
					<!--<select id="dd-countries" @change="onClickCountry()" ref="country_filter">-->
						<!--<option v-for="c in countries" :value="c.code" :key="c.name" class="dropdown-item">-->
							<!--{{c.name}}-->
						<!--</option>-->
					<!--</select>-->
				</li>
				<li class="dropdown mobile-version tablet-version">
					<a class="dropdown-toggle" href="#" id="dd-mobile-categories" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fal fa-pencil"></i>{{!!category ? category : 'Topics'}}</a>
					<div class="dropdown-menu" aria-labelledby="dd-mobile-categories">
						<a class="dropdown-item" href="#" v-for="c in menuCategories" :key="c.id" @click="onClickCategory(c.name)">{{c.name}}</a>
					</div>
				</li>

			</ul>
		</div>
		<div class="data-world-right-text">
			<div class="dasktop-version tablet-dasktop-version">
				<div class="data-world-inner">
					<ul>
						<li v-for="c in menuCategories" :key="c.id" :class="{'active': c.name===category}"><a href="#" @click="onClickCategory(c.name)">{{c.name}}</a></li>
					</ul>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import countries from '../helpers/countries.json';

export default {
  name: 'Nav',
  data () {
    return {
		countries: [],
		selCountry: ''
    }
  },
  mounted() {
	for (let code in countries) {
		this.countries.push({
			code,
			name: countries[code]
		});
	}
	this.countries.sort((a, b)=>a.name > b.name ? 1 : -1);
	this.countries.unshift({ code: '', name: 'Worldwide'});
 	/* $('#dd-countries').select2();
	$('#dd-countries').on('select2:select', (e) => {
		this.onClickCountry();
	}); */
  },
  computed: {
	...mapState([
		'category',
		'location',
		'trend',
		'user'
	]),
	menuCategories: function() {
		return this.categories.filter(c => c.show_menu);
	},
	display_country: function() {
		return !!this.location ? countries[this.location].substring(0, 8) : 'location';
	}
  },
  props: [
	  'categories'
  ],
  methods: {
	...mapMutations([
		'SET_CATEGORY',
		'SET_LOCATION',
		'SET_SUB_CATEGORY',
		'SET_TREND'
	]),
	onClickCategory(topic) {
		this.SET_CATEGORY(topic);
		this.SET_SUB_CATEGORY(null);
		this.$router.push({ name: 'Home' });
	},
	onClickCountry(code, name) {
		//const code = this.$refs.country_filter.value;
		this.SET_LOCATION(code);
		this.selCountry = name.substring(0, 10);
		this.$router.push({ name: 'Home' });
	},
	onClickTrend(trend) {
		this.SET_TREND(trend);
		this.$router.push({ name: 'Home' });
	},
	filterFunction() {
		var input, filter, ul, li, a, i, div, txtValue;
		input = document.getElementById("myInput");
		filter = input.value.toUpperCase();
		div = document.getElementById("countryDropDown");
		a = div.getElementsByTagName("a");
		for (i = 0; i < a.length; i++) {
			txtValue = a[i].textContent || a[i].innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				a[i].style.display = "";
			} else {
				a[i].style.display = "none";
			}
		}
	}
  }
}
</script>
