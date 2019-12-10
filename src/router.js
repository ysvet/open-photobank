import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import GalleryMainPage from './containers/GalleryMainPage/GalleryMainPage';
import Categories from './components/Pages/Categories/Categories';
import Category from './components/Pages/Categories/Category/Category';
import CategoryTime from './components/Pages/Categories/CategoryTime/CategoryTime';
import Albums from './components/Pages/Albums/Albums';
import Album from './components/Pages/Albums/Album/Album';
import Locations from './components/Pages/Locations/Locations';
import Location from './components/Pages/Locations/Location/Location';
import LocationCat from './components/Pages/Locations/LocationCat/LocationCat';
import LocationTime from './components/Pages/Locations/LocationTime/LocationTime';
import Periods from './components/Pages/Periods/Periods';
import Period from './components/Pages/Periods/Period/Period';
import About from './components/Pages/About/About';
import Terms from './components/Terms/Terms';
import Contributors from './components/Pages/Contributors/Contributors';
import Contributor from './components/Pages/Contributors/Contributor/Contributor';
import Contribute from './components/Pages/Contribute/Contribute';
import Latest from './components/Pages/Latest/Latest';
import ShowSearchResult from './components/ShowSearchResultsBlock/ShowSearchResultsBlock';
import Photo from './components/Pages/Photo/Photo';
import Login from './components/Admin/Login/Login';
import Register from './components/Admin/Register/Register';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import DashboardAlbums from './components/Admin/Dashboard/Albums/Albums';
import DashboardCategories from './components/Admin/Dashboard/Categories/Categories';
import DashboardContributors from './components/Admin/Dashboard/Contributors/Contributors';
import DashboardLocations from './components/Admin/Dashboard/Locations/Locations';
import DashboardSettings from './components/Admin/Dashboard/Settings/Settings';
import DashboardPhotos from './components/Admin/Dashboard/Photos/Photos';
import DashboardUsers from './components/Admin/Dashboard/Users/Users';
import DashboardTimePeriods from './components/Admin/Dashboard/TimePeriods/TimePeriods';
import DashboardAddAlbum from './components/Admin/Dashboard/Albums/AddAlbum';
import DashboardEditAlbum from './components/Admin/Dashboard/Albums/EditAlbum';
import DashboardAddContributor from './components/Admin/Dashboard/Contributors/AddContributor';
import DashboardEditContributor from './components/Admin/Dashboard/Contributors/EditContributor';
import DashboardAddPhoto from './components/Admin/Dashboard/Photos/AddPhoto';
import DashboardEditPhoto from './components/Admin/Dashboard/Photos/EditPhoto';
import DashboardAddLocation from './components/Admin/Dashboard/Locations/AddLocation';
import DashboardEditLocation from './components/Admin/Dashboard/Locations/EditLocation';
import DashboardAddCategory from './components/Admin/Dashboard/Categories/AddCategory';
import DashboardEditCategory from './components/Admin/Dashboard/Categories/EditCategory';
import DashboardAddTimePeriod from './components/Admin/Dashboard/TimePeriods/AddTimePeriod';
import DashboardEditTimePeriod from './components/Admin/Dashboard/TimePeriods/EditTimePeriod';
import NotFound from './components/Pages/NotFound/NotFound';
import PrivateRoute from './components/Admin/Routing/PrivateRoute';

const router = (
  <Router>
    <Layout>
      <Switch>
        <Route exact path='/adm/register' component={Register} />
        <Route exact path='/adm/login' component={Login} />
        <PrivateRoute exact path='/adm' component={Dashboard} />

        <PrivateRoute
          exact
          path='/adm/edit-album/:id'
          component={DashboardEditAlbum}
        />
        <PrivateRoute exact path='/adm/albums' component={DashboardAlbums} />
        <PrivateRoute
          exact
          path='/adm/add-album'
          component={DashboardAddAlbum}
        />

        <PrivateRoute
          exact
          path='/adm/categories'
          component={DashboardCategories}
        />
        <PrivateRoute
          exact
          path='/adm/add-category'
          component={DashboardAddCategory}
        />
        <PrivateRoute
          exact
          path='/adm/edit-category/:id'
          component={DashboardEditCategory}
        />
        <PrivateRoute
          exact
          path='/adm/contributors'
          component={DashboardContributors}
        />
        <PrivateRoute
          exact
          path='/adm/add-contributor'
          component={DashboardAddContributor}
        />
        <PrivateRoute
          exact
          path='/adm/edit-contributor/:id'
          component={DashboardEditContributor}
        />
        <PrivateRoute
          exact
          path='/adm/locations'
          component={DashboardLocations}
        />
        <PrivateRoute
          exact
          path='/adm/add-location'
          component={DashboardAddLocation}
        />

        <PrivateRoute
          exact
          path='/adm/edit-location/:id'
          component={DashboardEditLocation}
        />
        <PrivateRoute exact path='/adm/photos' component={DashboardPhotos} />
        <PrivateRoute
          exact
          path='/adm/add-photo'
          component={DashboardAddPhoto}
        />
        <PrivateRoute
          exact
          path='/adm/edit-photo/:id'
          component={DashboardEditPhoto}
        />
        <PrivateRoute exact path='/adm/general' component={DashboardSettings} />
        <PrivateRoute
          exact
          path='/adm/periods'
          component={DashboardTimePeriods}
        />
        <PrivateRoute
          exact
          path='/adm/add-period'
          component={DashboardAddTimePeriod}
        />

        <PrivateRoute
          exact
          path='/adm/edit-period/:id'
          component={DashboardEditTimePeriod}
        />
        <PrivateRoute exact path='/adm/users' component={DashboardUsers} />
        <Route exact path='/time-periods' component={Periods} />
        <Route exact path='/time-periods/:id' component={Period} />
        <Route exact path='/locations' component={Locations} />
        <Route exact path='/locations/:id' component={Location} />
        <Route
          exact
          path='/locations/:id/category/:idCat'
          component={LocationCat}
        />
        <Route
          exact
          path='/locations/:id/period/:idPeriod'
          component={LocationTime}
        />
        <Route exact path='/albums' component={Albums} />
        <Route exact path='/albums/:id' component={Album} />
        <Route exact path='/latest' component={Latest} />
        <Route exact path='/categories/:id' component={Category} />
        <Route exact path='/categories' component={Categories} />
        <Route
          exact
          path='/categories/:id/period/:idPeriod'
          component={CategoryTime}
        />
        <Route exact path='/search' component={ShowSearchResult} />
        <Route exact path='/about' component={About} />
        <Route exact path='/terms' component={Terms} />
        <Route exact path='/contributors/:id' component={Contributor} />
        <Route exact path='/contributors' component={Contributors} />
        <Route exact path='/contribute' component={Contribute} />
        <Route exact path='/photos/:id' component={Photo} />
        <Route exact path='/' component={GalleryMainPage} />
        <Route exact path='/not-found' component={NotFound} />
        <Redirect to='/not-found' />
      </Switch>
    </Layout>
  </Router>
);

export default router;
