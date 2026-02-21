import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    });
  }

  /**
   * 📧 Confirmation de commande
   */
  async sendOrderConfirmation(
    to: string,
    orderData: { orderId: string; total: number; items: any[] },
  ): Promise<void> {
    const itemsHtml = orderData.items
      .map(
        (item) =>
          `<tr><td>${item.productName || 'Produit'}</td><td>${item.quantity}</td><td>${item.unitPrice}€</td></tr>`,
      )
      .join('');

    await this.send({
      to,
      subject: `✅ Confirmation commande #${orderData.orderId.slice(0, 8)}`,
      html: `
        <h2>Merci pour votre commande !</h2>
        <p>Votre commande <strong>#${orderData.orderId.slice(0, 8)}</strong> a bien été reçue.</p>
        <table border="1" cellpadding="8" style="border-collapse:collapse">
          <thead><tr><th>Produit</th><th>Qté</th><th>Prix</th></tr></thead>
          <tbody>${itemsHtml}</tbody>
        </table>
        <p><strong>Total: ${orderData.total}€</strong></p>
        <p>Vous recevrez une notification dès l'expédition.</p>
      `,
    });
  }

  /**
   * 📧 Mise à jour statut de commande
   */
  async sendOrderStatusUpdate(
    to: string,
    orderId: string,
    newStatus: string,
    trackingNumber?: string,
  ): Promise<void> {
    const statusLabels: Record<string, string> = {
      EN_PREPARATION: '🔧 En préparation',
      EXPEDIEE: '🚚 Expédiée',
      LIVREE: '✅ Livrée',
      ANNULEE: '❌ Annulée',
      REMBOURSEE: '💰 Remboursée',
    };

    const label = statusLabels[newStatus] || newStatus;
    const trackingHtml = trackingNumber
      ? `<p>Numéro de suivi: <strong>${trackingNumber}</strong></p>`
      : '';

    await this.send({
      to,
      subject: `📦 Commande #${orderId.slice(0, 8)} — ${label}`,
      html: `
        <h2>Mise à jour de votre commande</h2>
        <p>Votre commande <strong>#${orderId.slice(0, 8)}</strong> est maintenant: <strong>${label}</strong></p>
        ${trackingHtml}
      `,
    });
  }

  /**
   * 📧 Réinitialisation de mot de passe
   */
  async sendPasswordReset(to: string, name: string, resetToken: string): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
    await this.send({
      to,
      subject: '🔑 Réinitialisation de votre mot de passe',
      html: `
        <h2>Bonjour ${name},</h2>
        <p>Vous avez demandé une réinitialisation de mot de passe.</p>
        <p><a href="${resetUrl}" style="background:#4CAF50;color:white;padding:10px 20px;text-decoration:none;border-radius:4px">Réinitialiser mon mot de passe</a></p>
        <p>Ce lien expirera dans 1 heure.</p>
        <p>Si vous n'avez pas fait cette demande, ignorez cet email.</p>
      `,
    });
  }

  /**
   * 📧 Baisse de prix (wishlist)
   */
  async sendPriceDropAlert(
    to: string,
    productName: string,
    oldPrice: number,
    newPrice: number,
    productId: string,
  ): Promise<void> {
    const savings = (oldPrice - newPrice).toFixed(2);
    const productUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/products/${productId}`;
    await this.send({
      to,
      subject: `💸 Baisse de prix: ${productName}`,
      html: `
        <h2>Bonne nouvelle !</h2>
        <p>Le produit <strong>${productName}</strong> de votre wishlist a baissé de prix.</p>
        <p>Ancien prix: <s>${oldPrice}€</s> → <strong style="color:green">${newPrice}€</strong> (−${savings}€)</p>
        <p><a href="${productUrl}">Voir le produit</a></p>
      `,
    });
  }

  /**
   * 📧 Email promotionnel
   */
  async sendPromotionalEmail(
    to: string,
    subject: string,
    htmlContent: string,
  ): Promise<void> {
    await this.send({
      to,
      subject,
      html: `
        ${htmlContent}
        <hr/>
        <p style="font-size:12px;color:#999">
          Pour ne plus recevoir ces emails, 
          <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/unsubscribe">se désabonner</a>
        </p>
      `,
    });
  }

  private async send(options: {
    to: string;
    subject: string;
    html: string;
  }): Promise<void> {
    try {
      if (!process.env.SMTP_USER || process.env.SMTP_USER === '') {
        this.logger.warn(`[DEV] Email non envoyé (SMTP non configuré): ${options.subject} → ${options.to}`);
        return;
      }
      await this.transporter.sendMail({
        from: `"E-Shop" <${process.env.SMTP_USER}>`,
        ...options,
      });
      this.logger.log(`Email envoyé: ${options.subject} → ${options.to}`);
    } catch (err) {
      this.logger.error(`Erreur envoi email: ${err.message}`);
    }
  }
}
