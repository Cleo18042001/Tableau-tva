<?php
// index.php
require_once 'config/database.php';
require_once 'includes/header.php';




$database = new Database();
$db = $database->getConnection();

// Récupérer tous les produits
$query = "SELECT * FROM produits ORDER BY id DESC";
$stmt = $db->prepare($query);
$stmt->execute();
$produits = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<div class="input-section">
    <div class="input-group">
        <button class="btn btn-ajouter" id="addProductBtn">
            <i class="fas fa-plus-circle"></i> Ajouter un produit
        </button>
    </div>
    
    <div class="buttons-section">
        <button class="btn btn-export" id="exportBtn">
            <i class="fas fa-file-export"></i> Exporter
        </button>
        <button class="btn btn-print" id="printBtn">
            <i class="fas fa-print"></i> Imprimer
        </button>
    </div>
</div>

<div class="table-container">
    <table id="vatTable">
        <thead>
            <tr>
                <th>ID</th>
                <th>Libellé</th>
                <th>Prix HT</th>
                <th>TVA</th>
                <th>Prix TTC</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="tableBody">
            <?php if(count($produits) > 0): ?>
                <?php foreach($produits as $produit): ?>
                    <tr id="row-<?php echo $produit['id']; ?>">
                        <td><?php echo $produit['id']; ?></td>
                        <td class="product-name"><?php echo htmlspecialchars($produit['libelle']); ?></td>
                        <td class="price-cell"><?php echo number_format($produit['prix_ht'], 2, ',', ' '); ?> €</td>
                        <td><span class="tva-percent"><?php echo $produit['tva']; ?>%</span></td>
                        <td class="price-cell"><strong><?php echo number_format($produit['prix_ttc'], 2, ',', ' '); ?> €</strong></td>
                        <td><?php echo date('d/m/Y', strtotime($produit['created_at'])); ?></td>
                        <td>
                            <div class="action-cell">
                                <button class="action-btn btn-editer" onclick="editProduct(<?php echo $produit['id']; ?>)">
                                    <i class="fas fa-edit"></i> Modifier
                                </button>
                                <button class="action-btn btn-supprimer" onclick="deleteProduct(<?php echo $produit['id']; ?>)">
                                    <i class="fas fa-trash"></i> Supprimer
                                </button>
                            </div>
                        </td>
                    </tr>
                <?php endforeach; ?>
            <?php else: ?>
                <tr>
                    <td colspan="7" class="empty-table">Aucun produit dans la base de données.</td>
                </tr>
            <?php endif; ?>
        </tbody>
    </table>
</div>

<?php
require_once 'includes/footer.php';
?>