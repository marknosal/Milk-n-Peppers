from flask import session
from config import db, app
from models import Clothing

with app.app_context():
    descriptions = {
        1: 'Used - Excellent. Black, Acrylic, Goth, Glam, Retro, Preloved',
        2: 'LPA Women\'s Black and White Blouse. Size XXS, Used - Excellent, LPA. This top is a wrap piece with four faux pearl buttons that I added myself making it ONE-OF-A-KIND! Fits like a glove. Sleeves have a tie AND gathering up top making them a little puffy. Low plunge neckline and super fitted waist with a little flair at the hips. Construction and fabric are high quality. #polkadots #pearls #bigshoulders #hourglass #LPA Black, White, Boho, Streetwear, Chic, Modern, Reworked/Upcycled, Handmade',
        3: 'Women\'s Tan and Cream Jacket. Size M, Used - Excellent. Maxima Wilson\'s Brand. Top knotch condition 👍 #jacket #70s #leatherjacket #vintage #coat Tan, Cream, Retro, Boho, Funky, 70s, Vintage, Preloved',
        4: 'Women\'s multi Crop-top. Size S, Like new. Handmade floral top. Preloved fabric. Eco-friendly. #backless #halter #handmade #oneofakind #sustainable Black, Multi, Petite, Cotton - Recycled, Boho, Funky, Rave, Modern, Handmade, Reworked / Upcycled',
        5: 'Women\'s multi Cardigan. Size L, Brand new. Stunning handmade piece. Fringe on the bottom. SO COZY. 10/10 condition. #crochet #cardigan #lgbtq #crochettop #kimono Multi, Black, Crochet, Boho, Funky, Bright, Modern, Handmade, Preloved',
        6: 'Used - Excellent, Nine West. Nine West brand. Dramatic, gothic, and classy at the same time. You can fit all the essentials +MORE. #formal #clutch #gothic #dramatic #fancy Black, Leather, Chic, Funky, Goth, Modern, Preloved',
        7: 'Women\'s multi Dress. Size S, Used - Excellent. This is a summer vacation must have and I\'m OBSESSED. I have never felt so comfortable and sexy. 10/10 dress. #vacation #tropical #beach #resort #honeymoon Multi, Green, Cotton, Cute, Chic, Funky, 90s, Preloved, Vintage',
        8: 'Women\'s Pink Dress. Size S, Used - Excellent. Rare 70s vintage. Cowl neck halter. Long halter ties. Open back. Two slits on the side. Everything is stunning about this dress. It\'s even comfortable! Soft and stretchy fabric. Kimono is listed below. #wedding #disco #70s #vintage #eveninggown Pink, Boho, Retro, Party, 70s, Vintage, Preloved',
        9: 'Mango Women\'s Orange and White Blouse. Size 2, Used - Excellent, Mango. #shirt #buttonup #blouse #70s #vintage Orange, White, Retro, Bright, Funky',
        10: 'Women\'s Brown Boots. Size US 7, Used - Good. 100% genuine leather. Dan Post brand. Excellent condition. Classic boot with a lot a wear left in them. Ready for the rodeo. #cowgirl #cowboyboots #leatherboots #american #rodeo Brown, Leather, Western, Boho, Streetwear, Modern, Preloved',
        11: 'Women\'s Black and White Jeans. Size M, Used - Excellent. Handmade from recycled fabric. Wide legged. High waisted. SO stretchy. Super comfortable. Raw hem. Ankle length ( I love wide legged ankle length because you never trip over them and you can wear them with rain boots and they never get wet). #widelegged #pants #beetlejuice #stripes #loosefitted Black, White, Grunge, Loungewear, Streetwear, Modern, Reworked / Upcycled, Handmade',
        12: 'Women\'s multi Joggers-tracksuits. Size M, Used - Excellent. Beautiful tie-dyed sweatpants. POCKETS. Elastic waistband and hem. Drawstring at waist. #tiedye #sweatpants #gay #lgbtq #rainbow Multi, White, Loungewear, Bright, Sportswear, Modern, Preloved',
        13: 'Women\'s Pink Trousers. Size 10, Used - Excellent. Gore-Tex, Hot pink, Heart charm, Inside pocket, OBSESSED. Says size 10 but runs SMALL fits more like a 6. Waist 27”-33”. Hips 41”. Inseam 31”. #shred #snow #goretex #pants #sporty Pink, Sportswear, Bright, Skater, Modern, Preloved',
        14: 'Women\'s Green and White Vest. Size M, Brand new. Handmade with recycled fabric. Lined and great quality. Bundle deal with the matching skirt. #tropicalhalter #tropical #haltertop #green #skirtset Green, White',
        15: 'Women\'s White and Green Skirt. Size M, Brand new. Love the print on this one. Handmade with upcycled fabric. Bundle deal if purchased with the top. #wrapskirt #tropical #skirtset #plants #wrap White, Green, Cute, Chic, Retro, Modern, Handmade, Reworked / Upcycled',
        16: 'Women\'s Purple and Black Dress. Size S, Like new. Super stretchy purple knit and black stretchy spandex on top. Open back. Side boob. One-of-a-kind. #party #dress #purple #handmade #repurposed Purple, Black, Party, Funky, Streetwear, Modern, Handmade, Reworked / Upcycled',
        17: 'Women\'s Green and Silver Hoodie. Size L, Like new. Lime green sweat shirt made from scratch. Ribbed cuffs, collar, and hem. Super soft fabric and high quality! One-of-a-kind. Handmade crew neck and patch by me. Size Large. #limegreen #crewneck #sweatshirt #yinyang #sweatset Green, Silver, Loungewear, Sportswear, Bright, Modern, Handmade, Designer',
        18: 'Women\'s Silver Shorts. Size M, Used - Excellent. Spice up your workout gear. Can be low rise or high waisted. Soft, stretchy, and comfortable. One-of-a-kind. Handmade by me. Waist 29”-38”. Hips 36”-46”. Rise (adjustable with fold) 10”-15”. Inseam 5”. #silver #shorts #spandex #workoutset #loungeshorts Silver, Funky, Loungewear, Streetwear, Modern, Handmade, Designer',
        19: 'Women\'s White Jumper. Size S, Used - Excellent. Upcycled sweater turned into a tank. Classic layering piece for this fall. Warm ivory color. #turtleneck #sweatertank #sleeveless #classic #gay White, Streetwear, Chic, Cute, Modern, Preloved, Reworked / Upcycled',
        20: 'Women\'s multi Dress. Size M, Brand new. One-of-a-kind. Made by M i l k + PEPPERS. Citrus and hot pink colors. Low plunge neckline with lace up. #70s #seethrough #swim #tropical #coverup Multi, Orange, Party, Retro, Bright, Modern, Preloved, Vintage',
        21: 'H&M Women\'s Green and Black Dress. Size 6, Used - Excellent, H&M. Loose A-line mini dress. Shirred turtle neck. Elastic wristbands. Blousy long sleeves. Lined and very comfortable. #witchy #60s #snakeskin #turtleneck #aline Green, Black, Retro, Funky, Goth, Modern, Preloved',
        22: 'Men\'s White and Blue T-shirt. Size S, Used - Excellent. Blue ribbed binding on the neck and sleeves. Great condition! Not true vintage but a real 70s vibe. #tshirt #70s #arizona #vinatgetshirt #desert White, Blue, Cotton, Retro, Boho, Streetwear, 70s, Preloved',
        23: 'Women\'s Orange and Green Blouse. Size S, Used - Excellent. Nicola Brand. Lightweight. 10/10 condition. Subtle bell sleeve. #70s #shirt #paisley #buttonup #vintage Orange, Green, Retro, Boho, Funky, 70s, Vintage, Preloved',
        24: 'Women\'s Pink T-shirt. Size M, Used - Excellent. Zipper on the side. Princess seams. Rich housewife vibez. Renato Nucci brand. Size 36 Fits like a M. #top #shirt #tanktop #bustier #renatonucci Pink, Chic, Funky, Bright, Modern, Designer, Preloved',
        25: 'Wilson\'s Leather Women\'s Black Skirt. Size 4, Used - Excellent, Wilson\'s Leather. 100% real Wilson\'s leather. Says size 12 but it has been altered. Fits more like a size 4. #leather #skirt #miniskirt #leatherskirt #wilsonleather Black, Grunge, Goth, Party, Modern, Preloved, Reworked / Upcycled',
        26: 'Women\'s Gold and Blue Blouse. Size S, Used - Excellent. Cotton, stretchy, comfortable. NO TAGS. #chinese #mandarin #mandarincollar #knotties #asian Gold, Blue, Chic, Streetwear, Costume, Modern, Preloved',
        27: 'Women\'s Red and Pink Dress. Size M, Used - Excellent. One-of-a-kind. Homemade with thrifted fabric. 70s inspired. Loose fitted. Comes with a waist tie (or headband in the picture). Size Medium. #boho #dress #70s #vintage #homemade Red, Pink, Cute, Boho, Retro, 70s, Handmade, Reworked / Upcycled',
    }

    clothings = Clothing.query.all()
    for cl in clothings:
        if cl.id in descriptions:
            cl.description = descriptions[cl.id]
    
    db.session.commit()