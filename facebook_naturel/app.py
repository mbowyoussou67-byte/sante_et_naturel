import os
import base64
import streamlit as st
from PIL import Image

DOSSIER_APP = os.path.dirname(os.path.abspath(__file__))

# 1. Configuration de la page
st.set_page_config(
    page_title="Santé & Naturel",
    page_icon=Image.open(os.path.join(DOSSIER_APP, "Logo sante & naturel.png")),
    layout="wide",
    initial_sidebar_state="expanded"
)

NUMERO_WHATSAPP = "221772702493"
LIEN_FACEBOOK = "https://facebook.com"


def chemin_image(nom):
    return os.path.join(DOSSIER_APP, nom)

# Fonction pour encoder l'image en base64 (pour intégration HTML facile)
def get_image_base64(path):
    if os.path.exists(path):
        with open(path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')
    return ""

logo_base64 = get_image_base64(chemin_image("Logo sante & naturel.png"))
logo_html_src = f"data:image/png;base64,{logo_base64}" if logo_base64 else ""

# 2. Styles CSS Personnalisés & Animations
st.markdown("""
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,600&family=Poppins:wght@400;600;700&display=swap');

    <style>
    /* Masquer le menu Streamlit natif et le footer */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    
    /* Supprimer les bandes blanches et marges inutiles */
    .block-container {
        padding-top: 1rem !important;
        padding-bottom: 1.5rem !important;
        padding-left: 1.5rem !important;
        padding-right: 1.5rem !important;
    }

    /* Arrière-plan global */
    .stApp {
        background: linear-gradient(135deg, #ecfdf5 0%, #e0f2fe 100%);
    }

    /* Barre latérale effet verre dépoli */
    [data-testid="stSidebar"] {
        background: rgba(255, 255, 255, 0.75) !important;
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border-right: 1px solid rgba(255, 255, 255, 0.4);
    }

    /* Transforme les radios du menu en VRAIS BOUTONS VOLANTS ANIMÉS */
    [data-testid="stSidebar"] div[role="radiogroup"] {
        gap: 8px;
    }

    [data-testid="stSidebar"] div[role="radiogroup"] label {
        background: rgba(255, 255, 255, 0.85) !important;
        backdrop-filter: blur(8px);
        border: 1px solid rgba(16, 185, 129, 0.2) !important;
        border-radius: 14px !important;
        padding: 10px 14px !important;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04) !important;
        transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1) !important;
        cursor: pointer !important;
        width: 100% !important;
    }

    /* Masquer le petit cercle radio */
    [data-testid="stSidebar"] div[role="radiogroup"] label > div:first-child {
        display: none !important;
    }

    /* Texte dans le bouton */
    [data-testid="stSidebar"] div[role="radiogroup"] label p {
        font-size: 14px !important;
        font-weight: 600 !important;
        color: #1f2937 !important;
        margin: 0 !important;
        font-family: 'Poppins', sans-serif;
    }

    /* EFFET AU SURVOL DU BOUTON MENU (HOVER VOLANT) */
    [data-testid="stSidebar"] div[role="radiogroup"] label:hover {
        transform: translateY(-5px) scale(1.02) !important;
        background: linear-gradient(135deg, #ffffff 0%, #dcfce7 100%) !important;
        box-shadow: 0 10px 20px rgba(16, 185, 129, 0.25) !important;
        border-color: #10b981 !important;
    }

    [data-testid="stSidebar"] div[role="radiogroup"] label:hover p {
        color: #059669 !important;
    }

    /* EFFET AU CLIC / SÉLECTIONNÉ */
    [data-testid="stSidebar"] div[role="radiogroup"] label:has(input:checked) {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
        border-color: #047857 !important;
        box-shadow: 0 6px 18px rgba(16, 185, 129, 0.4) !important;
        transform: translateY(-2px) scale(1.02) !important;
        animation: clickBounce 0.35s ease-out;
    }

    [data-testid="stSidebar"] div[role="radiogroup"] label:has(input:checked) p {
        color: #ffffff !important;
        font-weight: 700 !important;
    }

    @keyframes clickBounce {
        0% { transform: scale(0.95); }
        50% { transform: scale(1.04); }
        100% { transform: scale(1.02); }
    }

    /* EN-TÊTE / BANNIÈRE PRINCIPALE */
    .header-glass-card {
        background: rgba(255, 255, 255, 0.70);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border-radius: 20px;
        padding: 18px 24px;
        border: 1px solid rgba(255, 255, 255, 0.8);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
        margin-bottom: 20px;
    }

    .header-title-container {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 12px;
    }

    /* LOGO PETIT ET ROND */
    .logo-round {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        object-fit: cover;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        border: 2px solid #ffffff;
    }

    /* NOM "SANTÉ & NATUREL" ÉLÉGANT ET ANIMÉ */
    .brand-title-animated {
        font-family: 'Playfair Display', serif;
        font-size: 32px;
        font-weight: 700;
        margin: 0;
        background: linear-gradient(135deg, #059669 0%, #10b981 50%, #047857 100%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shine 4s ease-in-out infinite;
        letter-spacing: 0.5px;
    }

    @keyframes shine {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    /* SOUS-TITRE EN ARRIÈRE-PLAN GLACIAL TRANSPARENT */
    .subtitle-glacial-box {
        display: inline-block;
        background: rgba(255, 255, 255, 0.65);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(16, 185, 129, 0.25);
        padding: 8px 16px;
        border-radius: 12px;
        color: #374151;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
    }

    /* Cartes Produits Flottantes */
    .product-glass-card {
        background: rgba(255, 255, 255, 0.88);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 14px;
        border: 1px solid rgba(255, 255, 255, 0.9);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
        transition: all 0.35s ease;
        margin-bottom: 15px;
    }

    .product-glass-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 16px 30px rgba(16, 185, 129, 0.2);
        background: rgba(255, 255, 255, 0.96);
    }

    /* ANIMATION ZOOM SUR IMAGES */
    [data-testid="stImage"] img {
        border-radius: 14px;
        transition: transform 0.4s ease, filter 0.4s ease;
    }

    [data-testid="stImage"] img:hover {
        transform: scale(1.06);
        filter: brightness(1.03);
    }

    .category-tag {
        background: #dcfce7;
        color: #15803d;
        font-size: 11px;
        font-weight: 700;
        padding: 3px 10px;
        border-radius: 12px;
        display: inline-block;
        margin-top: 8px;
        margin-bottom: 6px;
        text-transform: uppercase;
        font-family: 'Poppins', sans-serif;
    }

    .product-title {
        font-size: 16px;
        font-weight: 700;
        color: #111827;
        margin-bottom: 4px;
        font-family: 'Poppins', sans-serif;
    }

    .product-desc-short {
        font-size: 12px;
        color: #4b5563;
        line-height: 1.35;
        height: 34px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 10px;
        font-family: 'Poppins', sans-serif;
    }

    .stButton > button {
        width: 100%;
        border-radius: 12px;
        font-weight: 700;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
        color: white !important;
        border: none !important;
        padding: 8px 0 !important;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        transition: all 0.3s ease !important;
        font-family: 'Poppins', sans-serif;
    }

    .stButton > button:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 20px rgba(16, 185, 129, 0.45) !important;
    }
    </style>
""", unsafe_allow_html=True)

# 3. Base de données produits
PRODUITS = [
    {
        "id": "aloe_berry",
        "nom": "Forever Aloe Berry Nectar",
        "categorie": "Boissons & Vitalité",
        "desc": "Bénéfique pour les règles douloureuses, le nettoyage des voies urinaires, l'équilibre hormonal et la prévention des infections.",
        "image": chemin_image("ALEO BERRY NECTAR.jpeg"),
        "disponible": True
    },
    {
        "id": "bee_pollen",
        "nom": "Forever Bee Pollen",
        "categorie": "Compléments Alimentaires",
        "desc": "Riche en vitamines et minéraux. Idéal en cas de fatigue, stimule l'appétit, la vitalité et les défenses naturelles.",
        "image": chemin_image("FOREVER BEE POLLEN.jpeg"),
        "disponible": True
    },
    {
        "id": "bee_propolis",
        "nom": "Forever Bee Propolis",
        "categorie": "Compléments Alimentaires",
        "desc": "Puissant antioxydant et antibiotique naturel. Stimule la production d'anticorps et renforce le système immunitaire.",
        "image": chemin_image("FOREVER BEE PROPOLIS.jpeg"),
        "disponible": True
    },
    {
        "id": "ail_thym",
        "nom": "Forever Ail & Thym",
        "categorie": "Compléments Alimentaires",
        "desc": "Antibiotique naturel favorisant le confort digestif, la circulation sanguine et la régulation de la pression artérielle.",
        "image": chemin_image("FOREVER AIL & THYM.jpeg"),
        "disponible": True
    },
    {
        "id": "calcium",
        "nom": "Forever Calcium",
        "categorie": "Compléments Alimentaires",
        "desc": "Formule complète associant Calcium, Magnésium, Vitamines C & D pour préserver le capital osseux et musculaire.",
        "image": chemin_image("FOREVER CALCIUM.jpeg"),
        "disponible": True
    },
    {
        "id": "vitolize_hommes",
        "nom": "Vitolize Hommes",
        "categorie": "Santé Homme",
        "desc": "Soutient le bon fonctionnement de la prostate, la fertilité et le maintien du taux naturel de testostérone.",
        "image": chemin_image("VITOLIZ HOMME.jpeg"),
        "disponible": True
    },
    {
        "id": "lycium_plus",
        "nom": "Forever Lycium Plus",
        "categorie": "Compléments Alimentaires",
        "desc": "Riche en antioxydants, combat le vieillissement cellulaire, purifie le foie et soutient la vision.",
        "image": chemin_image("FOEVER LYCIUM PLUS.jpeg"),
        "disponible": True
    },
    {
        "id": "multi_maca",
        "nom": "Forever Multi-Maca",
        "categorie": "Vitalité & Énergie",
        "desc": "Stimule la libido, augmente les performances physiques et intellectuelles, et rééquilibre les hormones.",
        "image": chemin_image("FOREVER MULTI-MACA.jpeg"),
        "disponible": True
    },
    {
        "id": "absorbent_c",
        "nom": "Forever Absorbent-C",
        "categorie": "Compléments Alimentaires",
        "desc": "Puissant antioxydant à la vitamine C liée au son d'avoine pour une absorption maximale par l'organisme.",
        "image": chemin_image("ABSORBANT C.jpeg"),
        "disponible": True
    },
    {
        "id": "arc_forever",
        "nom": "Arc Forever",
        "categorie": "Boissons & Vitalité",
        "desc": "Soutien synergique complet pour la vitalité globale et le bon fonctionnement cardiovasculaire.",
        "image": chemin_image("arc forever.jpeg"),
        "disponible": False
    }
]

# 4. Modale Pop-up lors du clic
@st.dialog("📋 Informations du Produit")
def afficher_details_produit(produit):
    st.markdown(f"### {produit['nom']}")
    if os.path.exists(produit["image"]):
        st.image(produit["image"], use_container_width=True)
    
    st.markdown(f"*Catégorie :* {produit['categorie']}")
    st.markdown(f"*Disponibilité :* {'✅ En Stock' if produit['disponible'] else '❌ Indisponible'}")
    st.markdown("---")
    st.markdown(f"**Description complète :**\n\n{produit['desc']}")
    
    msg = f"Bonjour Santé & Naturel, je souhaite commander : {produit['nom']}."
    lien_wa = f"https://wa.me/{NUMERO_WHATSAPP}?text={msg.replace(' ', '%20')}"
    st.link_button("📲 Commander ce produit via WhatsApp", lien_wa)

# 5. Barre latérale de navigation
with st.sidebar:
    logo_path = chemin_image("Logo sante & naturel.png")
    if os.path.exists(logo_path):
        st.image(logo_path, use_container_width=True)
    
    st.markdown("### 🌿 Menu Navigation")
    menu = st.radio(
        "Navigation",
        [
            "🏠 Accueil & Galerie",
            "📦 Tous les Produits",
            "✅ Produits Disponibles",
            "🛒 Commander en Ligne",
            "👤 Mon Profil",
            "💬 Discuter sur WhatsApp",
            "📘 Notre Page Facebook",
            "ℹ️ Informations & Contact",
            "🌟 Pourquoi Nous Choisir ?"
        ],
        label_visibility="collapsed"
    )

# 6. HTML de l'en-tête personnalisé avec logo rond et sous-titre glacial
logo_img_tag = f'<img src="{logo_html_src}" class="logo-round" alt="Logo">' if logo_html_src else '🌿'

header_html = f"""
    <div class="header-glass-card">
        <div class="header-title-container">
            {logo_img_tag}
            <h1 class="brand-title-animated">SANTÉ & NATUREL</h1>
        </div>
        <div class="subtitle-glacial-box">
            ✨ Découvrez nos compléments alimentaires et soins 100% naturels.
        </div>
    </div>
"""

# 7. Affichage dynamique selon le menu choisi
if menu in ["🏠 Accueil & Galerie", "📦 Tous les Produits", "✅ Produits Disponibles"]:
    st.markdown(header_html, unsafe_allow_html=True)

    if menu == "✅ Produits Disponibles":
        liste_a_afficher = [p for p in PRODUITS if p["disponible"]]
        st.markdown("##### 🛒 Produits Disponibles Actuellement")
    else:
        liste_a_afficher = PRODUITS
        categories = ["Toutes les catégories", "Boissons & Vitalité", "Compléments Alimentaires", "Santé Homme", "Vitalité & Énergie"]
        choix_cat = st.selectbox("🔍 Filtrer par catégorie :", categories)
        if choix_cat != "Toutes les catégories":
            liste_a_afficher = [p for p in PRODUITS if p["categorie"] == choix_cat]

    cols_per_row = 3
    for i in range(0, len(liste_a_afficher), cols_per_row):
        cols = st.columns(cols_per_row)
        for j, produit in enumerate(liste_a_afficher[i:i+cols_per_row]):
            with cols[j]:
                st.markdown('<div class="product-glass-card">', unsafe_allow_html=True)
                
                if os.path.exists(produit["image"]):
                    st.image(produit["image"], use_container_width=True)
                else:
                    st.warning("Image non disponible")
                
                st.markdown(f'<div class="category-tag">{produit["categorie"]}</div>', unsafe_allow_html=True)
                st.markdown(f'<div class="product-title">{produit["nom"]}</div>', unsafe_allow_html=True)
                st.markdown(f'<div class="product-desc-short">{produit["desc"]}</div>', unsafe_allow_html=True)
                
                if st.button("🔍 Voir détails & image", key=f"btn_detail_{produit['id']}"):
                    afficher_details_produit(produit)
                
                st.markdown('</div>', unsafe_allow_html=True)

elif menu == "🛒 Commander en Ligne":
    st.markdown(header_html, unsafe_allow_html=True)
    noms_produits = [p["nom"] for p in PRODUITS]
    produit_choisi = st.selectbox("Sélectionnez le produit :", noms_produits)
    quantite = st.number_input("Quantité :", min_value=1, max_value=10, value=1)
    
    msg_cmd = f"Bonjour Santé & Naturel, je souhaite commander {quantite}x {produit_choisi}."
    lien_cmd = f"https://wa.me/{NUMERO_WHATSAPP}?text={msg_cmd.replace(' ', '%20')}"
    st.link_button("🚀 Valider ma commande via WhatsApp", lien_cmd)

elif menu == "👤 Mon Profil":
    st.markdown(header_html, unsafe_allow_html=True)
    st.markdown("""
        <div class="subtitle-glacial-box" style="width: 100%; display: block; margin-top: 10px;">
            <h3>👤 Votre Profil Client</h3>
            <p>Bienvenue dans votre espace client chez <b>Santé & Naturel</b>.</p>
            <hr>
            <p>📍 <b>Zone de livraison :</b> Dakar & Régions du Sénégal</p>
            <p>💬 <b>Service client :</b> Disponible 7j/7 sur WhatsApp</p>
        </div>
    """, unsafe_allow_html=True)

elif menu == "💬 Discuter sur WhatsApp":
    st.markdown(header_html, unsafe_allow_html=True)
    st.link_button("📲 Ouvrir la discussion WhatsApp", f"https://wa.me/{NUMERO_WHATSAPP}")

elif menu == "📘 Notre Page Facebook":
    st.markdown(header_html, unsafe_allow_html=True)
    st.link_button("🌐 Rejoindre notre page Facebook", LIEN_FACEBOOK)

elif menu == "ℹ️ Informations & Contact":
    st.markdown(header_html, unsafe_allow_html=True)
    st.markdown("""
        <div class="subtitle-glacial-box" style="width: 100%; display: block; margin-top: 10px;">
            <p>📍 <b>Adresse :</b> Dakar, Sénégal</p>
            <p>📞 <b>Téléphone / WhatsApp :</b> +221 77 270 24 93</p>
            <p>🌿 <b>Spécialité :</b> Produits de santé, hygiène et compléments alimentaires naturels.</p>
        </div>
    """, unsafe_allow_html=True)

elif menu == "🌟 Pourquoi Nous Choisir ?":
    st.markdown(header_html, unsafe_allow_html=True)
    st.markdown("""
        <div class="subtitle-glacial-box" style="width: 100%; display: block; margin-top: 10px;">
            <ul>
                <li>🌿 <b>100% Qualité & Naturel :</b> Produits certifiés et authentiques.</li>
                <li>🚀 <b>Livraison Express :</b> Service rapide à domicile à Dakar.</li>
                <li>🤝 <b>Conseil Sur-Mesure :</b> Accompagnement gratuit pour chaque traitement.</li>
            </ul>
        </div>
    """, unsafe_allow_html=True)
