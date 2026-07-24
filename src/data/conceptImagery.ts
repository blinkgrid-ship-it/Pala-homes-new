/**
 * Curated real reference photography for the concept collection.
 *
 * IMPORTANT — honesty note:
 * These are freely-licensed photographs of *other, real* buildings, interiors
 * and resorts sourced from Wikimedia Commons. They are used as REPRESENTATIVE
 * REFERENCE IMAGERY to convey the mood of each concept — they are NOT
 * photographs of the concept properties (which are fictional), and different
 * angles of one concept may show different real buildings. Every file is
 * attributed in IMAGE_SOURCES.md.
 *
 * Any view without an entry here falls back to the original parametric vector
 * render (see components/ui/ArchScene + ImageWithFallback). To swap in genuine,
 * coherent photography of a single real property later, replace the URLs for
 * that property's views (or point them at local files in src/assets/concepts).
 *
 * URLs are stable Wikimedia upload thumbnails (1600px wide). ImageWithFallback
 * degrades gracefully to the render if any URL fails to load.
 */

const C = 'https://upload.wikimedia.org/wikipedia/commons/thumb';

/** propertyId -> viewId -> image URL */
export const conceptImagery: Record<string, Record<string, string>> = {
  'solara-bay': {
    'exterior-hero': `${C}/4/48/Brickell_Flatiron_-_Completed.jpg/1920px-Brickell_Flatiron_-_Completed.jpg`,
    terrace: `${C}/1/1c/Brickell_City_Centre_-_Flickr_-_Phillip_Pessar.jpg/1920px-Brickell_City_Centre_-_Flickr_-_Phillip_Pessar.jpg`,
    'living-room': `${C}/7/7c/Modern_living_room_with_large_windows_showing_view_of_trees_and_lake_in_daylight.jpg/1920px-Modern_living_room_with_large_windows_showing_view_of_trees_and_lake_in_daylight.jpg`,
    'kitchen-dining': `${C}/f/f5/Modern_kitchen_and_dining_area_with_stylish_furnishings_and_natural_light_in_a_contemporary_home_setting.jpg/1920px-Modern_kitchen_and_dining_area_with_stylish_furnishings_and_natural_light_in_a_contemporary_home_setting.jpg`,
    'primary-bedroom': `${C}/2/28/Hotel_bedroom_windows_%28Unsplash%29.jpg/1920px-Hotel_bedroom_windows_%28Unsplash%29.jpg`,
    'primary-bathroom': `${C}/9/96/White_towel_in_tiled_bathroom_%28Unsplash%29.jpg/1920px-White_towel_in_tiled_bathroom_%28Unsplash%29.jpg`,
    'sunset-balcony': `${C}/2/2f/DFC_5166_Rooftop_lounge_glow_overlooking_Pattayas_coastline_at_night_-_city_lights_stretching_into_the_horizon.jpg/1920px-DFC_5166_Rooftop_lounge_glow_overlooking_Pattayas_coastline_at_night_-_city_lights_stretching_into_the_horizon.jpg`,
    'material-detail': `${C}/5/5c/Twisting_building_facade_%28Unsplash%29.jpg/1920px-Twisting_building_facade_%28Unsplash%29.jpg`,
    'evening-view': `${C}/3/36/Northern_Brickell_skyline_at_night_20081203.jpg/1920px-Northern_Brickell_skyline_at_night_20081203.jpg`,
  },
  'casa-nila': {
    'exterior-hero': `${C}/5/57/3D_Rendering_of_Modern_Luxury_Villa_Exterior_with_Pool.jpg/1920px-3D_Rendering_of_Modern_Luxury_Villa_Exterior_with_Pool.jpg`,
    entrance: `${C}/3/33/Black_Ember_residence_-_AKL_Architects.jpg/1920px-Black_Ember_residence_-_AKL_Architects.jpg`,
    'pool-dock': `${C}/3/35/Infinity_Edge_Pool%2C_Mauritius.JPG/1920px-Infinity_Edge_Pool%2C_Mauritius.JPG`,
    'living-room': `${C}/a/a0/Modern_luxury_living_room_with_kitchen_interior.jpg/1920px-Modern_luxury_living_room_with_kitchen_interior.jpg`,
    'kitchen-dining': `${C}/2/26/Blue_white_kitchen_interior_%28Unsplash%29.jpg/1920px-Blue_white_kitchen_interior_%28Unsplash%29.jpg`,
    'primary-bedroom': `${C}/4/42/Canopy_bed_of_Amantaka_Suite_in_Amantaka_luxury_Resort_%26_Hotel_in_Luang_Prabang_Laos.jpg/1920px-Canopy_bed_of_Amantaka_Suite_in_Amantaka_luxury_Resort_%26_Hotel_in_Luang_Prabang_Laos.jpg`,
    'primary-bathroom': `${C}/7/7d/Bathroom_of_Khan_Pool_Suite_in_Amantaka_luxury_Resort_%26_Hotel_in_Luang_Prabang_Laos.jpg/1920px-Bathroom_of_Khan_Pool_Suite_in_Amantaka_luxury_Resort_%26_Hotel_in_Luang_Prabang_Laos.jpg`,
    'sunset-canal': `${C}/8/88/Infinity_pool_at_Coco_Ocean_Resort_%26_Spa_%28The_Gambia%29_%2823202380634%29.jpg/1920px-Infinity_pool_at_Coco_Ocean_Resort_%26_Spa_%28The_Gambia%29_%2823202380634%29.jpg`,
    'night-exterior': `${C}/6/62/Dreams-Curacao-Infinity-Pool.jpg/1920px-Dreams-Curacao-Infinity-Pool.jpg`,
  },
  'orchid-courtyard': {
    'exterior-hero': `${C}/8/83/Modern_residential_facade_%28Unsplash%29.jpg/1920px-Modern_residential_facade_%28Unsplash%29.jpg`,
    courtyard: `${C}/1/11/Courtyards_of_SPB_03.jpg/1920px-Courtyards_of_SPB_03.jpg`,
    'entrance-walk': `${C}/1/16/Bright_white_building_facade_%28Unsplash%29.jpg/1920px-Bright_white_building_facade_%28Unsplash%29.jpg`,
    'living-room': `${C}/6/68/Modern_wooden_house_interior_%28Unsplash%29.jpg/1920px-Modern_wooden_house_interior_%28Unsplash%29.jpg`,
    kitchen: `${C}/b/b1/Elegant_dining_setup_with_cozy_atmosphere_in_a_modern_room_featuring_gourmet_dishes_and_elegant_glassware.jpg/1920px-Elegant_dining_setup_with_cozy_atmosphere_in_a_modern_room_featuring_gourmet_dishes_and_elegant_glassware.jpg`,
    'primary-bedroom': `${C}/2/29/NY_loft_bedroom_%28Unsplash%29.jpg/1920px-NY_loft_bedroom_%28Unsplash%29.jpg`,
    'primary-bathroom': `${C}/c/cc/Bathtub_of_Khan_Pool_Suite_in_Amantaka_luxury_Resort_%26_Hotel_in_Luang_Prabang_Laos.jpg/1920px-Bathtub_of_Khan_Pool_Suite_in_Amantaka_luxury_Resort_%26_Hotel_in_Luang_Prabang_Laos.jpg`,
    'garden-pavilion': `${C}/c/c5/Infinity_Pool_in_Buhi_Resort.jpg/1920px-Infinity_Pool_in_Buhi_Resort.jpg`,
    'dusk-courtyard': `${C}/f/fd/Infinity_pool_at_The_Lalu_Resort%2C_Sun_Moon_Lake%2C_Taiwan.jpg/1920px-Infinity_pool_at_The_Lalu_Resort%2C_Sun_Moon_Lake%2C_Taiwan.jpg`,
  },
  'saffron-coast': {
    'exterior-hero': `${C}/b/bc/Infinity_Pool_Lopesan_Costa_Meloneras%2C_May_2018.jpg/1920px-Infinity_Pool_Lopesan_Costa_Meloneras%2C_May_2018.jpg`,
    'pool-terrace': `${C}/1/12/Infinity_Pool_%281471310973%29.jpg/1920px-Infinity_Pool_%281471310973%29.jpg`,
    'living-room': `${C}/4/49/Modern_living_room_with_stylish_furniture_and_a_view_of_the_outdoors_in_a_cozy_apartment_setting.jpg/1920px-Modern_living_room_with_stylish_furniture_and_a_view_of_the_outdoors_in_a_cozy_apartment_setting.jpg`,
    staircase: `${C}/9/91/White_staircase_%28Unsplash%29.jpg/1920px-White_staircase_%28Unsplash%29.jpg`,
    'primary-bedroom': `${C}/f/f7/Bedroom_window_%28Unsplash%29.jpg/1920px-Bedroom_window_%28Unsplash%29.jpg`,
    'evening-pool': `${C}/8/88/Infinity_pool_at_Coco_Ocean_Resort_%26_Spa_%28The_Gambia%29_%2823202380634%29.jpg/1920px-Infinity_pool_at_Coco_Ocean_Resort_%26_Spa_%28The_Gambia%29_%2823202380634%29.jpg`,
  },
};
